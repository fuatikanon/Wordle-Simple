export type LetterStatus = 'correct' | 'present' | 'absent' | 'empty' | 'typing';

export type GameStatus = 'playing' | 'won' | 'lost';

export interface EvaluatedLetter {
  letter: string;
  status: LetterStatus;
}

export interface GuessRow {
  letters: string[];
  evaluation?: EvaluatedLetter[];
  isSubmitted: boolean;
}

export interface WordItem {
  word: string;
  meaningTh: string;
  hint?: string;
}

export interface GameStats {
  played: number;
  won: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: Record<number, number>;
}
