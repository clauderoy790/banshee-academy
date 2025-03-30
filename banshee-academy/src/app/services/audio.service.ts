// src/app/services/audio.service.ts
import { Injectable } from '@angular/core';
import { Race } from '../models/race.model';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private correctSound: HTMLAudioElement;
  private incorrectSound: HTMLAudioElement;
  private buttonClickSound: HTMLAudioElement;
  private backgroundAudio: { [key: string]: HTMLAudioElement } = {};
  private currentBackground: HTMLAudioElement | null = null;

  constructor() {
    // Load sound effects
    this.correctSound = new Audio('assets/sounds/correct.mp3');
    this.incorrectSound = new Audio('assets/sounds/incorrect.mp3');
    this.buttonClickSound = new Audio('assets/sounds/button-click.mp3');

    // Load background sounds for each race
    this.backgroundAudio[Race.Undead] = new Audio(
      'assets/sounds/undead-background.mp3'
    );
    this.backgroundAudio[Race.Human] = new Audio(
      'assets/sounds/human-background.mp3'
    );
    this.backgroundAudio[Race.NightElf] = new Audio(
      'assets/sounds/nightelf-background.mp3'
    );
    this.backgroundAudio[Race.Orc] = new Audio(
      'assets/sounds/orc-background.mp3'
    );

    // Set loop for background sounds
    Object.values(this.backgroundAudio).forEach((audio) => {
      audio.loop = true;
    });
  }

  playCorrect(): void {
    this.correctSound.play();
  }

  playIncorrect(): void {
    this.incorrectSound.play();
  }

  playButtonClick(): void {
    this.buttonClickSound.play();
  }

  playBackground(race: Race): void {
    // Stop current background if playing
    if (this.currentBackground) {
      this.currentBackground.pause();
      this.currentBackground.currentTime = 0;
    }

    // Start new background
    this.currentBackground = this.backgroundAudio[race];
    this.currentBackground.play();
  }

  stopBackground(): void {
    if (this.currentBackground) {
      this.currentBackground.pause();
      this.currentBackground.currentTime = 0;
      this.currentBackground = null;
    }
  }
}
