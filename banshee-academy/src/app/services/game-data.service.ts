// src/app/services/game-data.service.ts
import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { CardType, Difficulty, Race } from '../models/race.model';
import {
  UD_UPGRADES,
  HU_UPGRADES,
  NE_UPGRADES,
  OC_UPGRADES,
} from '../constants/upgrades.constants';
import {
  UD_BUILDINGS,
  HU_BUILDINGS,
  NE_BUILDINGS,
  OC_BUILDINGS,
} from '../constants/buildings.constants';
import {
  UD_UNITS,
  HU_UNITS,
  NE_UNITS,
  OC_UNITS,
} from '../constants/units.constants';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  // Maps for quick access by race
  private cardsByRace: Map<Race, Card[]> = new Map<Race, Card[]>();
  private cardsByRaceAndType: Map<string, Card[]> = new Map<string, Card[]>();

  constructor() {
    // Initialize maps
    this.initializeDataMaps();
  }

  private initializeDataMaps(): void {
    // Initialize race map
    this.cardsByRace = new Map<Race, Card[]>();
    this.cardsByRace.set(Race.Undead, [
      ...UD_UPGRADES,
      ...UD_BUILDINGS,
      ...UD_UNITS,
    ]);
    this.cardsByRace.set(Race.Human, [
      ...HU_UPGRADES,
      ...HU_BUILDINGS,
      ...HU_UNITS,
    ]);
    this.cardsByRace.set(Race.NightElf, [
      ...NE_UPGRADES,
      ...NE_BUILDINGS,
      ...NE_UNITS,
    ]);
    this.cardsByRace.set(Race.Orc, [
      ...OC_UPGRADES,
      ...OC_BUILDINGS,
      ...OC_UNITS,
    ]);

    // Initialize race and type map for quick lookups
    this.cardsByRaceAndType = new Map<string, Card[]>();

    // Undead cards by type
    this.cardsByRaceAndType.set(
      `${Race.Undead}_${CardType.Upgrade}`,
      UD_UPGRADES
    );
    this.cardsByRaceAndType.set(
      `${Race.Undead}_${CardType.Building}`,
      UD_BUILDINGS
    );
    this.cardsByRaceAndType.set(`${Race.Undead}_${CardType.Unit}`, UD_UNITS);

    // Human cards by type
    this.cardsByRaceAndType.set(
      `${Race.Human}_${CardType.Upgrade}`,
      HU_UPGRADES
    );
    this.cardsByRaceAndType.set(
      `${Race.Human}_${CardType.Building}`,
      HU_BUILDINGS
    );
    this.cardsByRaceAndType.set(`${Race.Human}_${CardType.Unit}`, HU_UNITS);

    // Night Elf cards by type
    this.cardsByRaceAndType.set(
      `${Race.NightElf}_${CardType.Upgrade}`,
      NE_UPGRADES
    );
    this.cardsByRaceAndType.set(
      `${Race.NightElf}_${CardType.Building}`,
      NE_BUILDINGS
    );
    this.cardsByRaceAndType.set(`${Race.NightElf}_${CardType.Unit}`, NE_UNITS);

    // Orc cards by type
    this.cardsByRaceAndType.set(`${Race.Orc}_${CardType.Upgrade}`, OC_UPGRADES);
    this.cardsByRaceAndType.set(
      `${Race.Orc}_${CardType.Building}`,
      OC_BUILDINGS
    );
    this.cardsByRaceAndType.set(`${Race.Orc}_${CardType.Unit}`, OC_UNITS);
  }

  getCardsByRace(race: Race): Card[] {
    return this.cardsByRace.get(race) || [];
  }

  getCardsByRaceAndDifficulty(race: Race, difficulty: Difficulty): Card[] {
    return this.getCardsByRace(race).filter((card) =>
      card.difficulty.includes(difficulty)
    );
  }

  getCardsByRaceAndType(race: Race, type: CardType): Card[] {
    const key = `${race}_${type}`;
    return this.cardsByRaceAndType.get(key) || [];
  }
}
