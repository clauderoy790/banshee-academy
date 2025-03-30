import { Routes } from '@angular/router';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ModeSelectionComponent } from './components/mode-selection/mode-selection.component';
import { DifficultySelectionComponent } from './components/difficulty-selection/difficulty-selection.component';
import { LearningModeComponent } from './components/learning-mode/learning-mode.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';

export const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  { path: 'main-menu', component: MainMenuComponent },
  { path: 'mode-selection', component: ModeSelectionComponent },
  { path: 'difficulty-selection', component: DifficultySelectionComponent },
  { path: 'learning-mode', component: LearningModeComponent },
  { path: 'game-screen', component: GameScreenComponent },
  { path: '**', redirectTo: '' }
];