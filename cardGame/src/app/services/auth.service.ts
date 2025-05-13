// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3010/api';
  private baseUrl2 = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  async login(login: string, password: string): Promise<void> {
    try {
      // Envoi du login pour récupérer le token
      const resLogin = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password })
      });
  
      if (!resLogin.ok) {
        throw new Error('Login échoué');
      }
  
      const loginData = await resLogin.json();
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('isLoggedIn', 'true');
  
      // Ensuite, récupération des profils
      const resProfiles = await fetch(`${this.baseUrl}/profiles`);
      const profiles = await resProfiles.json();
  
      // Recherche du nom correspondant au login
      const profile = profiles.find((p: any) => p.login === login);
      if (profile) {
        console.info("Nom de l'utilisateur :", profile.name);
        localStorage.setItem('user', JSON.stringify(profile));
        // Tu peux retourner ou utiliser le nom ici
      }
  
    } catch (error) {
      console.error("Erreur lors du login :", error);
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  createProfile(profile: { login: string, password: string, name: string }) {
    return this.http.put(`${this.baseUrl}/profiles`, profile).pipe(
      tap((response: any) => {
         // Enregistrer les informations du profil dans le localStorage
          localStorage.setItem('user', JSON.stringify(response)); // enregistre le profil complet dans localStorage
          localStorage.setItem('isLoggedIn', 'true'); // enregistre l'état de connexion
          localStorage.setItem('token', response.token); // si tu as un token, l'enregistrer également
      })
    )
  }

  addCard(card: { name: string, value: number }) {
    return this.http.put(`${this.baseUrl2}/cards`, card).pipe(
      tap((response: any) => {
         // Enregistrer les informations du profil dans le localStorage
         localStorage.setItem('card', response.name)
          // localStorage.setItem('user', JSON.stringify(response)); // enregistre le profil complet dans localStorage
          // localStorage.setItem('isLoggedIn', 'true'); // enregistre l'état de connexion
          // localStorage.setItem('token', response.token); // si tu as un token, l'enregistrer également
      })
    )
  }

  getCurrentUserName(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).name : null;
  }
  
}
