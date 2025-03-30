// src/app/components/learning-mode/learning-mode.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../../services/audio.service';
import { GameDataService } from '../../services/game-data.service';
import { Race, CardType } from '../../models/race.model';
import { Card } from '../../models/card.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-learning-mode',
  templateUrl: './learning-mode.component.html',
  styleUrls: ['./learning-mode.component.scss'],
  imports: [NgFor]
})
export class LearningModeComponent implements OnInit {
  selectedRace: Race = Race.Undead; // Default
  categories = ['All', 'Buildings', 'Units', 'Upgrades', 'Heroes'];
  selectedCategory = 'All';
  allCards: Card[] = [];
  filteredCards: Card[] = [];

  constructor(
    private router: Router,
    private audioService: AudioService,
    private gameDataService: GameDataService
  ) {}

  ngOnInit(): void {
    // Get the selected race from localStorage
    const race = localStorage.getItem('selectedRace') as Race;
    if (race) {
      this.selectedRace = race;
    }
    
    // Get cards for the selected race
    this.allCards = this.gameDataService.getCardsByRace(this.selectedRace);
    this.filterCardsByCategory();
  }

  selectCategory(category: string): void {
    this.audioService.playButtonClick();
    this.selectedCategory = category;
    this.filterCardsByCategory();
  }

  filterCardsByCategory(): void {
    if (this.selectedCategory === 'All') {
      this.filteredCards = this.allCards;
    } else {
      // Map category name to CardType enum
      let cardType: CardType;
      switch (this.selectedCategory) {
        case 'Buildings':
          cardType = CardType.Building;
          break;
        case 'Units':
          cardType = CardType.Unit;
          break;
        case 'Upgrades':
          cardType = CardType.Upgrade;
          break;
        case 'Heroes':
          cardType = CardType.Hero;
          break;
        default:
          cardType = CardType.Building;
      }
      
      this.filteredCards = this.allCards.filter(card => card.type === cardType);
    }
  }

  getCardImage(card: Card): string {
    return card.imagePath || 'assets/images/placeholder.png';
  }

  goBack(): void {
    this.audioService.playButtonClick();
    this.router.navigate(['/main-menu']);
  }
}