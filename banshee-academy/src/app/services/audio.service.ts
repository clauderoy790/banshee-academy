// src/app/services/audio.service.ts
import { Injectable } from '@angular/core';
import { Race } from '../models/race.model';

const BG_VOLUME = 0.1;

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private correctSound: HTMLAudioElement;
  private incorrectSound: HTMLAudioElement;
  private buttonClickSound: HTMLAudioElement;
  private backgroundAudio: { [key: string]: HTMLAudioElement } = {};
  private currentBackground: HTMLAudioElement | null = null;
  private currentRace?: Race;
  private muted = false;
  private readonly MUTE_STORAGE_KEY = 'banshee_academy_mute';

  constructor() {
    // Load sound effects
    this.correctSound = new Audio('assets/sounds/correct.mp3');
    this.incorrectSound = new Audio('assets/sounds/incorrect.mp3');
    this.buttonClickSound = new Audio('assets/sounds/button-click.mp3');

    // Load background music for each race
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

    // Set loop/volume for background sounds
    Object.values(this.backgroundAudio).forEach((audio) => {
      audio.loop = true;
      audio.volume = BG_VOLUME;
    });

    this.loadMuteState();
  }

  private loadMuteState(): void {
    const muteState = localStorage.getItem(this.MUTE_STORAGE_KEY);
    if (muteState !== null) {
      this.muted = muteState === 'true';
    }
  }

  private saveMuteState(): void {
    localStorage.setItem(this.MUTE_STORAGE_KEY, String(this.muted));
  }

  playCorrect(): void {
    if (!this.muted) {
      this.correctSound.play();
    }
  }

  playIncorrect(): void {
    if (!this.muted) {
      this.incorrectSound.play();
    }
  }

  playButtonClick(): void {
    if (!this.muted) {
      this.buttonClickSound.play();
    }
  }

  playBackground(race?: Race): void {
    // Stop current background if playing
    if (race && this.currentRace != race && this.currentBackground) {
      this.currentBackground.pause();
      this.currentBackground.currentTime = 0;
    }

    // set race
    this.currentRace = race ?? this.currentRace ?? Race.Undead;

    // Start new background
    this.currentBackground = this.backgroundAudio[this.currentRace];

    if (!this.muted && this.currentBackground) {
      this.currentBackground.play().catch((error) => {
        console.error('Error playing background music:', error);
      });
    }
  }

  isMuted(): boolean {
    return this.muted;
  }

  setMute(mute: boolean): void {
    this.muted = mute;
    this.saveMuteState();

    if (this.muted) {
      // Mute all sounds
      if (this.currentBackground) {
        this.currentBackground.pause();
      }
    } else {
      // Resume background music if it exists
      if (this.currentBackground) {
        this.currentBackground.play().catch((error) => {
          console.error('Error playing background music:', error);
        });
      }
    }
  }
}
