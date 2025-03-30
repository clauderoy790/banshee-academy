// src/app/services/user-progress.service.ts
import { Injectable } from '@angular/core';
import { UserProgress } from '../models/progress.model';
import { Difficulty, Race } from '../models/race.model';

@Injectable({
  providedIn: 'root'
})
export class UserProgressService {
  private readonly STORAGE_KEY = 'banshee_academy_progress';
  private currentProgress: UserProgress | undefined;
  private currentStreak = 0;

  constructor() {
    this.loadProgress();
  }

  private initializeProgress(): UserProgress {
    const progress: UserProgress = {
      bestStreaks: {
        [Race.Undead]: {
          [Difficulty.Easy]: 0,
          [Difficulty.Medium]: 0,
          [Difficulty.Hard]: 0
        },
        [Race.Human]: {
          [Difficulty.Easy]: 0,
          [Difficulty.Medium]: 0,
          [Difficulty.Hard]: 0
        },
        [Race.NightElf]: {
          [Difficulty.Easy]: 0,
          [Difficulty.Medium]: 0,
          [Difficulty.Hard]: 0
        },
        [Race.Orc]: {
          [Difficulty.Easy]: 0,
          [Difficulty.Medium]: 0,
          [Difficulty.Hard]: 0
        }
      }
    };
    return progress;
  }

  private loadProgress(): void {
    const storedProgress = localStorage.getItem(this.STORAGE_KEY);
    if (storedProgress) {
      this.currentProgress = JSON.parse(storedProgress);
    } else {
      this.currentProgress = this.initializeProgress();
      this.saveProgress();
    }
  }

  private saveProgress(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.currentProgress));
  }

  getBestStreak(race: Race, difficulty: Difficulty): number {
    return this.currentProgress?.bestStreaks[race][difficulty] || 0;
  }

  getCurrentStreak(): number {
    return this.currentStreak;
  }

  incrementStreak(): void {
    this.currentStreak++;
  }

  resetStreak(): void {
    this.currentStreak = 0;
  }

  updateBestStreak(race: Race, difficulty: Difficulty): void {
    if (this.currentProgress && this.currentStreak > (this.currentProgress?.bestStreaks?.[race]?.[difficulty] || 0)) {
      this.currentProgress.bestStreaks[race][difficulty] = this.currentStreak;
      this.saveProgress();
    }
  }
}