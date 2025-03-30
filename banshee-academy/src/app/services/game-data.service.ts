// src/app/services/game-data.service.ts
import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { CardType, Difficulty, Race } from '../models/race.model';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private cards: Card[] = [
    // Undead examples
    {
      id: 'ud_ziggurat',
      name: 'Ziggurat',
      race: Race.Undead,
      type: CardType.Building,
      goldCost: 150,
      woodCost: 40,
      imagePath: 'assets/images/cards/ud_ziggurat.png',
      difficulty: [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard]
    },
    // ... more cards will be added
  ];

  constructor() { }

  getCardsByRace(race: Race): Card[] {
    return this.cards.filter(card => card.race === race);
  }

  getCardsByRaceAndDifficulty(race: Race, difficulty: Difficulty): Card[] {
    return this.cards.filter(
      card => card.race === race && card.difficulty.includes(difficulty)
    );
  }

  getCardsByRaceAndType(race: Race, type: CardType): Card[] {
    return this.cards.filter(
      card => card.race === race && card.type === type
    );
  }
}