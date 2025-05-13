import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent {
  isLoggedIn = false
  baseUrl = 'http://localhost:3010/api'

  constructor(public router: Router, private authService: AuthService, private http: HttpClient) {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log(this.isLoggedIn)
  }

  get userName(): string | null {
    return this.authService.getCurrentUserName();
  }

  async invoquer(): Promise<void> {
    const nouvelleCarte = {
      name: 'Dragon de feu',
      value: Math.floor(Math.random() * 100) + 1
    };
  
    try {
      const res = await fetch('http://localhost:3010/api/cards', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nouvelleCarte)
      });
  
      if (!res.ok) {
        throw new Error('Erreur lors de l’invocation de la carte');
      }
  
      const carte = await res.json();
      console.log('Carte invoquée :', carte);
  
      // Optionnel : tu peux ajouter cette carte à un tableau local si tu veux l'afficher
      // this.cartesInvoquees.push(carte);
  
    } catch (err) {
      console.error('Erreur pendant l’invocation :', err);
      // Optionnel : gérer une variable d’erreur à afficher dans le template
      // this.erreurInvocation = 'Impossible d’invoquer une carte.';
    }
  }
}
