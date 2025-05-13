import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-card.component.html'
})
export class AddCardComponent {
  cardForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.cardForm = this.fb.group({
      name: ['', Validators.required],
      value: [0, [Validators.required, Validators.min(1)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.cardForm.valid) {
      const { name, value } = this.cardForm.value;

      this.authService.addCard({ name, value }).subscribe({
        next: () => this.router.navigate(['/play']), // Redirection vers la page principale
        error: err => {
          console.error(err);
          this.errorMessage = 'Erreur lors de l\'ajout d\'une carte';
        }
      });
    }
  }
}
