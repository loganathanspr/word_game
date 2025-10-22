
export enum GameState {
  START,
  PLAYING,
  END,
}

export interface Language {
  code: string;
  name: string;
}

export interface GameWord {
  objectName: string;
  word: string;
  wordEnglish: string;
}

export interface GameRound extends GameWord {
  imageUrl: string;
  isCorrect: boolean;
}
