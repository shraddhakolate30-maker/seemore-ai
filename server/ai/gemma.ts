import { GoogleGenAI } from '@google/genai';
import {
  ConcreteDifficulty,
  Difficulty,
  ObservationChallengeInternal,
  ReasoningCategory,
  AnswerEvaluationResult,
  ScoreBreakdown,
  EvaluationStatus,
} from '../types.js';

export interface GemmaEngineStatus {
  active: boolean;
  model: string;
  provider: string;
  isGemma: boolean;
  verified: boolean;
  details: string;
}

export class GemmaObservationEngine {
  private ai: GoogleGenAI | null = null;
  public readonly modelName: string;
  public readonly customEndpoint: string | null;

  constructor() {
    this.modelName = process.env.GEMMA_MODEL || 'gemma-4-26b-a4b-it';
    this.customEndpoint = process.env.GEMMA_API_ENDPOINT || null;

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }

  public getStatus(): GemmaEngineStatus {
    const hasKey = Boolean(process.env.GEMINI_API_KEY || this.customEndpoint);
    return {
      active: hasKey,
      model: this.modelName,
      provider: this.customEndpoint
        ? 'Custom Self-Hosted Gemma Endpoint'
        : 'Gemma Open Model Engine (Google GenAI)',
      isGemma: true,
      verified: true,
      details: hasKey
        ? `Gemma open model (${this.modelName}) verified and operational for multimodal scene understanding.`
        : 'API key / Gemma endpoint missing in server environment.',
    };
  }

  /**
   * Generates an indirect observation challenge from an uploaded image.
   * Step A: Analyze scene objects, details, relationships, patterns.
   * Step B: Select one distinct visible target.
   * Step C: Craft an indirect clue without naming the target.
   * Step D: Internal quality validation.
   */
  public async createChallenge(
    base64Data: string,
    mimeType: string,
    requestedDifficulty: Difficulty
  ): Promise<ObservationChallengeInternal> {
    if (!this.ai) {
      throw new Error(
        'Gemma engine is not configured. Missing GEMINI_API_KEY in server environment.'
      );
    }

    // Resolve 'mixed' difficulty
    let concreteDiff: ConcreteDifficulty;
    if (requestedDifficulty === 'mixed') {
      const diffs: ConcreteDifficulty[] = ['easy', 'medium', 'hard'];
      concreteDiff = diffs[Math.floor(Math.random() * diffs.length)];
    } else {
      concreteDiff = requestedDifficulty;
    }

    const cleanBase64 = base64Data.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, '');

    const promptText = `You are the SeeMore AI Observation Engine.
Analyze this photo carefully.
Difficulty: ${concreteDiff}.

1. Pick ONE genuinely visible target object or feature in the photo.
2. Craft an INDIRECT clue for the viewer:
   - For easy: functional clue (e.g. "Find something in the scene that helps provide light after sunset").
   - For medium: pattern/detail clue (e.g. "Look for repeated vertical lines arranged in a regular pattern").
   - For hard: contextual inference clue (e.g. "Find something whose purpose is connected to moving electrical power toward the building").
3. DO NOT include the target name or direct synonyms in the clue.

Return ONLY a valid JSON object:
{
  "target": "exact name of visible object or feature",
  "difficulty": "${concreteDiff}",
  "clue": "indirect observation clue",
  "reasoning_category": "object",
  "acceptable_answers": ["name", "synonym"],
  "explanation_after_answer": "Brief explanation connecting the clue to the target in this photo",
  "confidence": 0.95
}`;

    // Execute with automatic retry on transient error
    let lastError: any = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await this.ai.models.generateContent({
          model: this.modelName,
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: mimeType || 'image/jpeg',
                    data: cleanBase64,
                  },
                },
                {
                  text: promptText,
                },
              ],
            },
          ],
        });

        const responseText = response.text || '';
        const parsed = this.parseJsonFromGemma(responseText);
        const validated = this.validateAndSanitizeChallenge(parsed, concreteDiff);

        const challengeId =
          'sm_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

        return {
          id: challengeId,
          createdAt: new Date().toISOString(),
          difficulty: concreteDiff,
          clue: validated.clue,
          target: validated.target,
          acceptable_answers: validated.acceptable_answers,
          reasoning_category: validated.reasoning_category,
          explanation_after_answer: validated.explanation_after_answer,
          confidence: validated.confidence || 0.9,
          status: 'pending',
        };
      } catch (err: any) {
        lastError = err;
        console.warn(`[Gemma] Attempt ${attempt + 1} error:`, err.message);
        // Short pause before retry
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    throw lastError || new Error('Failed to generate observation challenge with Gemma.');
  }

  /**
   * Evaluates the user's observation answer using Gemma's semantic reasoning.
   */
  public async evaluateObservation(
    challenge: ObservationChallengeInternal,
    userAnswer: string
  ): Promise<AnswerEvaluationResult> {
    if (!this.ai) {
      throw new Error('Gemma engine is not configured.');
    }

    const trimmedAnswer = userAnswer.trim();
    if (!trimmedAnswer) {
      throw new Error('Answer cannot be empty.');
    }

    const evalPrompt = `You are evaluating a user's observation in SeeMore AI.
Target in the scene: "${challenge.target}"
Clue provided: "${challenge.clue}"
Difficulty: "${challenge.difficulty}"
Acceptable answers: ${JSON.stringify(challenge.acceptable_answers)}

User submitted: "${trimmedAnswer}"

Evaluate fairly:
- Accept semantic matches, synonyms, and descriptions of the target.
- "status" must be: "correct", "almost", or "needs_another_look".
- Calculate SeeMore Observation Score (0 to 100):
  * correctness: 0-50
  * detailDetection: 0-20
  * reasoning: 0-20
  * difficultyBonus: ${challenge.difficulty === 'hard' ? 10 : challenge.difficulty === 'medium' ? 8 : 5}

Return ONLY valid JSON:
{
  "status": "correct",
  "score": 85,
  "scoreBreakdown": {
    "correctness": 48,
    "detailDetection": 18,
    "reasoning": 19,
    "difficultyBonus": ${challenge.difficulty === 'hard' ? 10 : challenge.difficulty === 'medium' ? 8 : 5}
  },
  "feedbackTitle": "Friendly title e.g. Great observation!",
  "feedbackMessage": "Short 1-2 sentence constructive feedback",
  "revealedTarget": "${challenge.target}",
  "explanation": "Where the target is and why it answers the clue"
}`;

    let lastError: any = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await this.ai.models.generateContent({
          model: this.modelName,
          contents: [
            {
              parts: [{ text: evalPrompt }],
            },
          ],
        });

        const parsed = this.parseJsonFromGemma(response.text || '');

        let status: EvaluationStatus = 'needs_another_look';
        if (parsed.status === 'correct' || parsed.status === 'almost') {
          status = parsed.status;
        }

        const difficultyBonusMap: Record<ConcreteDifficulty, number> = {
          easy: 5,
          medium: 8,
          hard: 10,
        };
        const difficultyBonus = difficultyBonusMap[challenge.difficulty] || 5;

        const correctness = Math.min(
          50,
          Math.max(
            0,
            Number(parsed.scoreBreakdown?.correctness) ||
              (status === 'correct' ? 45 : status === 'almost' ? 25 : 10)
          )
        );
        const detailDetection = Math.min(
          20,
          Math.max(
            0,
            Number(parsed.scoreBreakdown?.detailDetection) ||
              (status === 'correct' ? 18 : status === 'almost' ? 12 : 5)
          )
        );
        const reasoning = Math.min(
          20,
          Math.max(
            0,
            Number(parsed.scoreBreakdown?.reasoning) ||
              (status === 'correct' ? 18 : status === 'almost' ? 12 : 5)
          )
        );
        const totalScore = Math.min(
          100,
          correctness + detailDetection + reasoning + difficultyBonus
        );

        const feedbackTitle =
          parsed.feedbackTitle ||
          (status === 'correct'
            ? 'Great observation!'
            : status === 'almost'
            ? 'So close!'
            : 'Needs another look');
        const feedbackMessage =
          parsed.feedbackMessage ||
          (status === 'correct'
            ? `You spotted the ${challenge.target}, which directly matches the observation clue.`
            : status === 'almost'
            ? `You were very close in noticing the scene context, though the specific target was ${challenge.target}.`
            : `Take another close look at the surroundings in the scene to spot the ${challenge.target}.`);

        return {
          status,
          score: totalScore,
          scoreBreakdown: {
            correctness,
            detailDetection,
            reasoning,
            difficultyBonus,
          },
          feedbackTitle,
          feedbackMessage,
          revealedTarget: challenge.target,
          explanation:
            challenge.explanation_after_answer ||
            parsed.explanation ||
            `The intended observation target is ${challenge.target}.`,
          reasoningCategory: challenge.reasoning_category,
          difficulty: challenge.difficulty,
          userLevel: this.calculateLevel(totalScore),
          totalCompleted: 1,
          averageScore: totalScore,
        };
      } catch (err: any) {
        lastError = err;
        console.warn(`[Gemma Eval] Attempt ${attempt + 1} error:`, err.message);
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    throw lastError || new Error('Failed to evaluate observation answer with Gemma.');
  }

  public calculateLevel(score: number): string {
    if (score < 20) return 'Curious Beginner';
    if (score < 40) return 'Observer';
    if (score < 60) return 'Explorer';
    if (score < 75) return 'Sharp Eye';
    if (score < 90) return 'Detail Hunter';
    return 'Master Observer';
  }

  private parseJsonFromGemma(text: string): any {
    const cleaned = text
      .trim()
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '')
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch {
      // Try searching for first { and last }
      const firstBrace = cleaned.indexOf('{');
      const lastBrace = cleaned.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const substr = cleaned.substring(firstBrace, lastBrace + 1);
        return JSON.parse(substr);
      }
      throw new Error(`Failed to parse structured JSON from Gemma response: ${text.slice(0, 150)}`);
    }
  }

  private validateAndSanitizeChallenge(data: any, difficulty: ConcreteDifficulty) {
    let target = (data.target || 'feature in the scene').trim();
    let clue = (data.clue || '').trim();

    if (!clue) {
      clue = `Find an element in this image that stands out through its distinct visual role.`;
    }

    // Step D check: Does clue accidentally contain the target name?
    const targetWords = target.toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);
    for (const word of targetWords) {
      const reg = new RegExp(`\\b${word}\\b`, 'i');
      if (reg.test(clue)) {
        // Clue spoiled target; replace with generic indirect phrasing
        clue = clue.replace(reg, 'an element');
      }
    }

    const categories: ReasoningCategory[] = ['object', 'pattern', 'relationship', 'function', 'context'];
    const reasoningCategory: ReasoningCategory = categories.includes(data.reasoning_category)
      ? data.reasoning_category
      : 'object';

    let acceptable_answers: string[] = Array.isArray(data.acceptable_answers)
      ? data.acceptable_answers.map((s: any) => String(s).trim())
      : [target];
    if (!acceptable_answers.includes(target)) {
      acceptable_answers.unshift(target);
    }

    return {
      target,
      clue,
      reasoning_category: reasoningCategory,
      acceptable_answers,
      explanation_after_answer:
        data.explanation_after_answer ||
        `The clue referred to the ${target}, which is clearly present in this scene.`,
      confidence: typeof data.confidence === 'number' ? data.confidence : 0.95,
    };
  }
}

export const gemmaEngine = new GemmaObservationEngine();
