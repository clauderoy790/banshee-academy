import { Race, Difficulty } from './race.model';

export interface UserProgress {
  bestStreaks: {
    [key in Race]: {
      [key in Difficulty]: number;
    };
  };
}