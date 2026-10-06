export type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';
export type ConcreteDifficulty = 'easy' | 'medium' | 'hard';
export type ReasoningCategory = 'object' | 'pattern' | 'relationship' | 'function' | 'context';
export type EvaluationStatus = 'correct' | 'almost' | 'needs_another_look';

export interface ObservationChallengeInternal {
  id: string;
  createdAt: string;
  difficulty: ConcreteDifficulty;
  clue: string;
  target: string; // Secret - NEVER sent to client before answer evaluation!
  acceptable_answers: string[]; // Secret
  reasoning_category: ReasoningCategory;
  explanation_after_answer: string; // Secret until after answer
  confidence: number;
  status: 'pending' | 'evaluated';
  userAnswer?: string;
  evaluation?: AnswerEvaluationResult;
}

export interface PublicChallenge {
  id: string;
  difficulty: ConcreteDifficulty;
  clue: string;
  reasoning_category: ReasoningCategory;
  createdAt: string;
}

export interface ScoreBreakdown {
  correctness: number; // 0 - 50
  detailDetection: number; // 0 - 20
  reasoning: number; // 0 - 20
  difficultyBonus: number; // 0 - 10
}

export interface AnswerEvaluationResult {
  status: EvaluationStatus;
  score: number; // 0 - 100 SeeMore Observation Score
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
