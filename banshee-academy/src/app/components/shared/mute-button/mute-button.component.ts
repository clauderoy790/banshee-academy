// src/app/components/shared/mute-button/mute-button.component.ts
import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../../services/audio.service';

@Component({
  selector: 'app-mute-button',
  templateUrl: './mute-button.component.html',
  styleUrls: ['./mute-button.component.scss']
})
export class MuteButtonComponent implements OnInit {
  isMuted = false;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.isMuted = this.audioService.isMuted();
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    this.audioService.setMute(this.isMuted);
  }

  getIconPath(): string {
    return this.isMuted 
      ? 'assets/images/icons/unmute-btn.png' 
      : 'assets/images/icons/mute-btn.png';
  }
}