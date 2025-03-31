// src/app/components/main-menu/main-menu.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Race, Difficulty } from '../../models/race.model';
import { UserProgressService } from '../../services/user-progress.service';
import { AudioService } from '../../services/audio.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  imports: [],
})
export class MainMenuComponent implements OnInit {
  races = Object.values(Race);

  constructor(
    private router: Router,
    private progressService: UserProgressService,
    private audioService: AudioService
  ) {}
  ngOnInit(): void {
    this.audioService.playBackground();
  }

  selectRace(race: Race): void {
    this.audioService.playButtonClick();
    // Store selected race in a service or localStorage
    localStorage.setItem('selectedRace', race);
    this.audioService.playBackground(race);
    this.router.navigate(['/mode-selection']);
  }

  getRaceIcon(race: Race): string {
    // Return the path to race icons
    return `assets/images/icons/${race
      .toLowerCase()
      .replace(' ', '')}_icon.png`;
  }

  getBestStreak(race: Race): number {
    // Return the highest streak across all difficulties
    const easyStreak = this.progressService.getBestStreak(
      race,
      Difficulty.Easy
    );
    const mediumStreak = this.progressService.getBestStreak(
      race,
      Difficulty.Medium
    );
    const hardStreak = this.progressService.getBestStreak(
      race,
      Difficulty.Hard
    );

    return Math.max(easyStreak, mediumStreak, hardStreak);
  }
}
