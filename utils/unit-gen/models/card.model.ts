import { CardType, Difficulty, Race } from './race.model';

export interface Card {
  id: string;
  name: string;
  race: Race;
  type: CardType;
  goldCost: number;
  woodCost: number;
  imagePath: string;
  difficulty: Difficulty[]; 
}
