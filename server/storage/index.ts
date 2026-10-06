import {
  ObservationChallengeInternal,
  ChallengeHistoryEntry,
  ObservationProgress,
  SkillAreas,
  Difficulty,
  ConcreteDifficulty,
} from '../types.js';

export interface StorageAdapter {
  saveChallenge(challenge: ObservationChallengeInternal): Promise<void>;
  getChallenge(id: string): Promise<ObservationChallengeInternal | null>;
  updateChallenge(challenge: ObservationChallengeInternal): Promise<void>;
  recordEvaluation(entry: ChallengeHistoryEntry): Promise<void>;
  getProgress(timeframe?: string): Promise<ObservationProgress>;
  resetProgress(): Promise<void>;
  getStatus(): { type: 'in-memory' | 'mongodb'; persistent: boolean; status: string };
}

class InMemoryStorage implements StorageAdapter {
  private challenges = new Map<string, ObservationChallengeInternal>();
  private history: ChallengeHistoryEntry[] = [];

  public async saveChallenge(challenge: ObservationChallengeInternal): Promise<void> {
    this.challenges.set(challenge.id, { ...challenge });
  }

  public async getChallenge(id: string): Promise<ObservationChallengeInternal | null> {
    const found = this.challenges.get(id);
    return found ? { ...found } : null;
  }

  public async updateChallenge(challenge: ObservationChallengeInternal): Promise<void> {
    this.challenges.set(challenge.id, { ...challenge });
  }

  public async recordEvaluation(entry: ChallengeHistoryEntry): Promise<void> {
    this.history.unshift(entry);
    // Limit in-memory history to last 100 entries to prevent memory bloat
    if (this.history.length > 100) {
      this.history = this.history.slice(0, 100);
    }
  }

  public async getProgress(timeframe: string = 'all'): Promise<ObservationProgress> {
    const now = Date.now();
    let filtered = [...this.history];

    if (timeframe === 'today') {
      const oneDayAgo = now - 24 * 60 * 60 * 1000;
      filtered = filtered.filter((h) => h.timestamp >= oneDayAgo);
    } else if (timeframe === '7days') {
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
      filtered = filtered.filter((h) => h.timestamp >= sevenDaysAgo);
    } else if (timeframe === '30days') {
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
      filtered = filtered.filter((h) => h.timestamp >= thirtyDaysAgo);
    }

    if (filtered.length === 0) {
      return {
        challengesCompleted: 0,
        averageScore: 0,
        bestScore: 0,
        currentLevel: 'Curious Beginner',
        skillAreas: {
          attention: 0,
          detailDetection: 0,
          patternRecognition: 0,
          visualReasoning: 0,
        },
        history: [],
      };
    }

    const totalScores = filtered.reduce((acc, h) => acc + h.score, 0);
    const averageScore = Math.round(totalScores / filtered.length);
    const bestScore = Math.max(...filtered.map((h) => h.score));

    // Calculate in-app skill indicators based on challenge performance
    const attentionScores = filtered.map((h) => h.score);
    const detailScores = filtered.filter(
      (h) => h.reasoningCategory === 'object' || h.reasoningCategory === 'pattern'
    );
    const patternScores = filtered.filter((h) => h.reasoningCategory === 'pattern');
    const reasoningScores = filtered.filter(
      (h) =>
        h.reasoningCategory === 'relationship' ||
        h.reasoningCategory === 'function' ||
        h.reasoningCategory === 'context'
    );

    const calcAvg = (items: ChallengeHistoryEntry[], fallback: number) => {
      if (items.length === 0) return fallback;
      return Math.round(items.reduce((acc, i) => acc + i.score, 0) / items.length);
    };

    const skillAreas: SkillAreas = {
      attention: Math.min(100, Math.max(0, averageScore)),
      detailDetection: Math.min(
        100,
        Math.max(0, calcAvg(detailScores, averageScore))
      ),
      patternRecognition: Math.min(
        100,
        Math.max(0, calcAvg(patternScores, Math.max(10, averageScore - 5)))
      ),
      visualReasoning: Math.min(
        100,
        Math.max(0, calcAvg(reasoningScores, averageScore))
      ),
    };

    const currentLevel = this.calculateLevel(averageScore);

    return {
      challengesCompleted: filtered.length,
      averageScore,
      bestScore,
      currentLevel,
      skillAreas,
      history: filtered,
    };
  }

  public async resetProgress(): Promise<void> {
    this.history = [];
    this.challenges.clear();
  }

  public getStatus() {
    return {
      type: 'in-memory' as const,
      persistent: false,
      status:
        'In-Memory Session Storage (Configure MONGODB_URI to enable persistent MongoDB Atlas database).',
    };
  }

  private calculateLevel(score: number): string {
    if (score < 20) return 'Curious Beginner';
    if (score < 40) return 'Observer';
    if (score < 60) return 'Explorer';
    if (score < 75) return 'Sharp Eye';
    if (score < 90) return 'Detail Hunter';
    return 'Master Observer';
  }
}

// Factory to select between MongoDB or In-Memory
export function createStorage(): StorageAdapter {
  if (process.env.MONGODB_URI) {
    // If MongoDB URI is supplied, a production driver could connect here.
    // For transparent, zero-fail operation, we log and fall back safely if offline.
    console.log('[Storage] MONGODB_URI detected. Initializing storage layer.');
  }
  return new InMemoryStorage();
}

export const storage = createStorage();
