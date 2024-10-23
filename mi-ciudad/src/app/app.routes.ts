import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { HomePage } from './pages/home/home.page';
import { ProfilePage } from './pages/profile/profile.page';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./layouts/main-content/main-content.component').then((m) => m.MainContentComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        data: {title: 'Home'},
        component: HomePage,
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        data: {title: 'Perfil'},
        component: ProfilePage,
        canActivate: [authGuard],
      },
    ]
  },
  {
    path: '',
    redirectTo: '/main/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    data: {title: 'Login'},
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    canActivate: [loginGuard],
  },
  {
    path: 'register',
    data: {title: 'Registrarse'},
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage),
    canActivate: [loginGuard],
  },  {
    path: 'commerce',
    loadComponent: () => import('./pages/commerce/commerce.page').then( m => m.CommercePage)
  },

];
