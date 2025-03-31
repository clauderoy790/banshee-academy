// src/app/services/game-data.service.ts
import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { CardType, Difficulty, Race } from '../models/race.model';
import { ALL_CARDS } from '../constants/cards.constants';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  constructor() {}

  getCardsByRace(race: Race): Card[] {
    return ALL_CARDS.filter((card) => card.race === race);
  }

  getCardsByRaceAndDifficulty(race: Race, difficulty: Difficulty): Card[] {
    return ALL_CARDS.filter(
      (card) => card.race === race && card.difficulty.includes(difficulty)
    );
  }

  getCardsByRaceAndType(race: Race, type: CardType): Card[] {
    return ALL_CARDS.filter((card) => card.race === race && card.type === type);
  }
}
