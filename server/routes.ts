import { Router, Request, Response } from 'express';
import { gemmaEngine } from './ai/gemma.js';
import { storage } from './storage/index.js';
import {
  Difficulty,
  PublicChallenge,
  ChallengeHistoryEntry,
  SystemStatus,
} from './types.js';

export const apiRouter = Router();

// GET /api/system/status
apiRouter.get('/system/status', async (req: Request, res: Response) => {
  try {
    const aiStatus = gemmaEngine.getStatus();
    const storageStatus = storage.getStatus();

    const response: SystemStatus = {
      ai: {
        provider: aiStatus.provider,
        model: aiStatus.model,
        isGemma: aiStatus.isGemma,
        status: aiStatus.active ? 'connected' : 'unconfigured',
        verified: aiStatus.verified,
        description: aiStatus.details,
      },
      storage: {
        type: storageStatus.type,
        persistent: storageStatus.persistent,
        status: storageStatus.status,
      },
    };

    res.json(response);
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to retrieve system status.',
      details: error.message,
    });
  }
});

// POST /api/challenges/generate
apiRouter.post('/challenges/generate', async (req: Request, res: Response) => {
  try {
    const { image, mimeType, difficulty = 'easy' } = req.body;

    if (!image || typeof image !== 'string') {
      return res.status(400).json({
        error: 'Please provide a valid photo to generate an observation challenge.',
      });
    }

    // Check size (base64 string length: ~20MB max)
    if (image.length > 20 * 1024 * 1024) {
      return res.status(400).json({
        error: 'The photo file is too large. Please select an image under 15MB.',
      });
    }

    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const detectedMime = mimeType || 'image/jpeg';
    if (!validMimes.some((m) => detectedMime.toLowerCase().includes(m.split('/')[1]))) {
      return res.status(400).json({
        error: 'Unsupported image format. Please use a JPG, JPEG, PNG, or WEBP file.',
      });
    }

    const validDifficulties: Difficulty[] = ['easy', 'medium', 'hard', 'mixed'];
    const chosenDifficulty: Difficulty = validDifficulties.includes(difficulty)
      ? difficulty
      : 'easy';

    // Generate observation challenge with Gemma
    const internalChallenge = await gemmaEngine.createChallenge(
      image,
      detectedMime,
      chosenDifficulty
    );

    // Save full challenge securely on the server
    await storage.saveChallenge(internalChallenge);

    // CRITICAL: Strip all target, acceptable answers, and explanation before sending to client!
    const publicChallenge: PublicChallenge = {
      id: internalChallenge.id,
      difficulty: internalChallenge.difficulty,
      clue: internalChallenge.clue,
      reasoning_category: internalChallenge.reasoning_category,
      createdAt: internalChallenge.createdAt,
    };

    res.json(publicChallenge);
  } catch (error: any) {
    console.error('[API] Challenge generation error:', error);
    res.status(500).json({
      error: 'Something went wrong while creating your challenge. Please try again.',
      details: error.message,
    });
  }
});

// POST /api/challenges/:id/evaluate
apiRouter.post('/challenges/:id/evaluate', async (req: Request, res: Response) => {
  try {
    const challengeId = req.params.id;
    const { answer } = req.body;

    if (!answer || typeof answer !== 'string' || !answer.trim()) {
      return res.status(400).json({
        error: 'Please enter what you observed before submitting your answer.',
      });
    }

    const challenge = await storage.getChallenge(challengeId);
    if (!challenge) {
      return res.status(404).json({
        error: 'Observation challenge not found or session expired. Please start a new challenge.',
      });
    }

    // Evaluate user's observation via Gemma
    const evaluation = await gemmaEngine.evaluateObservation(challenge, answer.trim());

    // Record evaluation into history
    const historyEntry: ChallengeHistoryEntry = {
      id: challenge.id,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      timestamp: Date.now(),
      target: evaluation.revealedTarget,
      clue: challenge.clue,
      userAnswer: answer.trim(),
      status: evaluation.status,
      score: evaluation.score,
      difficulty: challenge.difficulty,
      reasoningCategory: challenge.reasoning_category,
    };

    await storage.recordEvaluation(historyEntry);

    // Update challenge state in storage
    challenge.status = 'evaluated';
    challenge.userAnswer = answer.trim();
    challenge.evaluation = evaluation;
    await storage.updateChallenge(challenge);

    // Fetch updated aggregate stats
    const progress = await storage.getProgress();
    evaluation.totalCompleted = progress.challengesCompleted;
    evaluation.averageScore = progress.averageScore;
    evaluation.userLevel = progress.currentLevel;

    res.json(evaluation);
  } catch (error: any) {
    console.error('[API] Answer evaluation error:', error);
    res.status(500).json({
      error: 'Unable to evaluate your answer at this moment. Please try again.',
      details: error.message,
    });
  }
});

// GET /api/progress
apiRouter.get('/progress', async (req: Request, res: Response) => {
  try {
    const timeframe = (req.query.timeframe as string) || 'all';
    const progress = await storage.getProgress(timeframe);
    res.json(progress);
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to load observation progress.',
      details: error.message,
    });
  }
});

// POST /api/progress/reset
apiRouter.post('/progress/reset', async (req: Request, res: Response) => {
  try {
    await storage.resetProgress();
    res.json({ success: true, message: 'Observation progress reset successfully.' });
  } catch (error: any) {
    res.status(500).json({
      error: 'Failed to reset observation progress.',
      details: error.message,
    });
  }
});
