// src/app/components/game-screen/game-screen.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from '../../services/audio.service';
import { GameDataService } from '../../services/game-data.service';
import { UserProgressService } from '../../services/user-progress.service';
import { Race, Difficulty } from '../../models/race.model';
import { Card } from '../../models/card.model';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
  imports: [FormsModule, NgIf],
})
export class GameScreenComponent implements OnInit, OnDestroy {
  selectedRace: Race = Race.Undead;
  selectedDifficulty: Difficulty = Difficulty.Easy;
  cards: Card[] = [];
  currentCard: Card | null = null;
  userAnswerGold: number | null = null;
  userAnswerWood: number | null = null;
  isAnswerSubmitted = false;
  isAnswerCorrect = false;
  currentStreak = 0;
  bestStreak = 0;
  timerPercentage = 100;
  timerValue = 10; // seconds
  timerInterval: any;
  showCorrectAnimation = false;
  showIncorrectAnimation = false;

  constructor(
    private router: Router,
    private audioService: AudioService,
    private gameDataService: GameDataService,
    private progressService: UserProgressService
  ) {}

  ngOnInit(): void {
    // Get the selected race and difficulty from localStorage
    const race = localStorage.getItem('selectedRace') as Race;
    const difficulty = localStorage.getItem('selectedDifficulty') as Difficulty;

    if (race) {
      this.selectedRace = race;
    }

    if (difficulty) {
      this.selectedDifficulty = difficulty;

      // Set timer based on difficulty
      if (difficulty === Difficulty.Easy) {
        this.timerValue = 30;
      } else if (difficulty === Difficulty.Medium) {
        this.timerValue = 20;
      } else {
        this.timerValue = 10;
      }
    }

    // Get the best streak for this race and difficulty
    this.bestStreak = this.progressService.getBestStreak(
      this.selectedRace,
      this.selectedDifficulty
    );

    // Load cards for the selected race and difficulty
    this.cards = this.gameDataService.getCardsByRaceAndDifficulty(
      this.selectedRace,
      this.selectedDifficulty
    );

    // Start with a random card
    this.nextCard();

    // Play race-specific background music
    this.audioService.playBackground(this.selectedRace);
  }

  ngOnDestroy(): void {
    // Clear timer when component is destroyed
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  nextCard(): void {
    // Reset state for new card
    this.userAnswerGold = null;
    this.userAnswerWood = null;
    this.isAnswerSubmitted = false;
    this.showCorrectAnimation = false;
    this.showIncorrectAnimation = false;

    // Pick a random card
    const randomIndex = Math.floor(Math.random() * this.cards.length);
    this.currentCard = this.cards[randomIndex];

    // Reset and start timer
    this.resetTimer();
  }

  resetTimer(): void {
    // Clear existing timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    // Reset timer percentage
    this.timerPercentage = 100;

    // Set up new timer
    const intervalStep = 100; // ms
    const decrementPerStep = 100 / ((this.timerValue * 1000) / intervalStep);

    this.timerInterval = setInterval(() => {
      this.timerPercentage -= decrementPerStep;

      if (this.timerPercentage <= 0) {
        // Time's up, treat as incorrect answer
        this.timerPercentage = 0;
        clearInterval(this.timerInterval);

        if (!this.isAnswerSubmitted) {
          this.isAnswerSubmitted = true;
          this.isAnswerCorrect = false;
          this.showIncorrectAnimation = true;

          this.audioService.playIncorrect();
          this.progressService.resetStreak();
          this.currentStreak = 0;

          // After 2 seconds, move to next card
          setTimeout(() => {
            this.nextCard();
          }, 2000);
        }
      }
    }, intervalStep);
  }

  checkAnswer(): void {
    if (this.isAnswerSubmitted || !this.currentCard) {
      return;
    }

    this.isAnswerSubmitted = true;

    // Check if answers are correct
    const gold = this.userAnswerGold ?? 0;
    const wood = this.userAnswerWood ?? 0;
    const isGoldCorrect = gold === this.currentCard.goldCost;
    const isWoodCorrect = wood === this.currentCard.woodCost;
    this.isAnswerCorrect = isGoldCorrect && isWoodCorrect;

    if (this.isAnswerCorrect) {
      // Handle correct answer
      this.showCorrectAnimation = true;
      this.audioService.playCorrect();

      // Update streak
      this.progressService.incrementStreak();
      this.currentStreak = this.progressService.getCurrentStreak();

      // Update best streak if current streak is better
      this.progressService.updateBestStreak(
        this.selectedRace,
        this.selectedDifficulty
      );
      this.bestStreak = this.progressService.getBestStreak(
        this.selectedRace,
        this.selectedDifficulty
      );
    } else {
      // Handle incorrect answer
      this.showIncorrectAnimation = true;
      this.audioService.playIncorrect();

      // Reset streak
      this.progressService.resetStreak();
      this.currentStreak = 0;
    }

    // Clear timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    // After 2 seconds, move to next card
    setTimeout(() => {
      this.nextCard();
    }, 2000);
  }

  goToMainMenu(): void {
    this.audioService.playButtonClick();
    this.router.navigate(['/main-menu']);
  }
}
