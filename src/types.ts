export type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';
export type ConcreteDifficulty = 'easy' | 'medium' | 'hard';
export type ReasoningCategory = 'object' | 'pattern' | 'relationship' | 'function' | 'context';
export type EvaluationStatus = 'correct' | 'almost' | 'needs_another_look';

export interface PublicChallenge {
  id: string;
  difficulty: ConcreteDifficulty;
  clue: string;
  reasoning_category: ReasoningCategory;
  createdAt: string;
}

export interface ScoreBreakdown {
  correctness: number;
  detailDetection: number;
  reasoning: number;
  difficultyBonus: number;
}

export interface AnswerEvaluationResult {
  status: EvaluationStatus;
  score: number;
  scoreBreakdown: ScoreBreakdown;
  feedbackTitle: string;
  feedbackMessage: string;
  revealedTarget: string;
  explanation: string;
  reasoningCategory: ReasoningCategory;
  difficulty: ConcreteDifficulty;
  userLevel: string;
  totalCompleted: number;
  averageScore: number;
}

export interface SkillAreas {
  attention: number;
  detailDetection: number;
  patternRecognition: number;
  visualReasoning: number;
}

export interface ChallengeHistoryEntry {
  id: string;
  date: string;
  timestamp: number;
  target: string;
  clue: string;
  userAnswer: string;
  status: EvaluationStatus;
  score: number;
  difficulty: ConcreteDifficulty;
  reasoningCategory: ReasoningCategory;
}

export interface ObservationProgress {
  challengesCompleted: number;
  averageScore: number;
  bestScore: number;
  currentLevel: string;
  skillAreas: SkillAreas;
  history: ChallengeHistoryEntry[];
}

export interface SystemStatus {
  ai: {
    provider: string;
    model: string;
    isGemma: boolean;
    status: 'connected' | 'error' | 'unconfigured';
    verified: boolean;
    description: string;
  };
  storage: {
    type: 'in-memory' | 'mongodb';
    persistent: boolean;
    status: string;
  };
}
