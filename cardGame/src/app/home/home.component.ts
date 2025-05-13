import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'cardGame';
  isLoggedIn = false

  constructor(public router: Router, private authService: AuthService) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log(this.isLoggedIn)
  }

  isHome(): boolean {
    return this.router.url === '/';
  }

  get userName(): string | null {
    return this.authService.getCurrentUserName();
  }
}
