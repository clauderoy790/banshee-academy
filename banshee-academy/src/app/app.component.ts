import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MuteButtonComponent } from './components/shared/mute-button/mute-button.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MuteButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'banshee-academy';
}
