import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    // Navigate to main menu after 2.5 seconds
    setTimeout(() => {
      this.router.navigate(['/main-menu']);
    }, 2500);
  }
}