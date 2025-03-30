// src/app/components/mode-selection/mode-selection.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../../services/audio.service';
import { Race } from '../../models/race.model';

@Component({
  selector: 'app-mode-selection',
  templateUrl: './mode-selection.component.html',
  styleUrls: ['./mode-selection.component.scss']
})
export class ModeSelectionComponent implements OnInit {
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

  selectMode(mode: 'play' | 'learn'): void {
    this.audioService.playButtonClick();
    
    if (mode === 'play') {
      this.router.navigate(['/difficulty-selection']);
    } else {
      this.router.navigate(['/learning-mode']);
    }
  }

  goBack(): void {
    this.audioService.playButtonClick();
    this.router.navigate(['/main-menu']);
  }
}