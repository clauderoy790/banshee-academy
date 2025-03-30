// src/app/components/difficulty-selection/difficulty-selection.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../../services/audio.service';
import { Race, Difficulty } from '../../models/race.model';

@Component({
  selector: 'app-difficulty-selection',
  templateUrl: './difficulty-selection.component.html',
  styleUrls: ['./difficulty-selection.component.scss']
})
export class DifficultySelectionComponent implements OnInit {
  selectedRace: Race = Race.Undead; // Default

  constructor(
    private router: Router,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    // Get the selected race from localStorage
    const race = localStorage.getItem('selectedRace') as Race;
    if (race) {
      this.selectedRace = race;
    }
  }

  selectDifficulty(difficulty: string): void {
    this.audioService.playButtonClick();
    
    // Store the selected difficulty
    localStorage.setItem('selectedDifficulty', difficulty);
    
    // Navigate to the game screen
    this.router.navigate(['/game-screen']);
  }

  goBack(): void {
    this.audioService.playButtonClick();
    this.router.navigate(['/mode-selection']);
  }
}