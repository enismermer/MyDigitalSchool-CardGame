import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { AddCardComponent } from './add-card/add-card.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'play', component: PlayComponent},
    { path: 'addCard', component: AddCardComponent}
];
