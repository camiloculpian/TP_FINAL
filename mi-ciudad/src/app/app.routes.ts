import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { CommercesPage } from './pages/commerces/commerces.page';
import { ProfilePage } from './pages/profile/profile.page';
import { NotificationsPage } from './pages/notifications/notifications.page';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./layouts/main-content/main-content.component').then((m) => m.MainContentComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        data: {title: 'Listado de Comercios'},
        component: CommercesPage,
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        data: {title: 'Editar tu perfil'},
        component: ProfilePage,
        canActivate: [authGuard],
      },
      {
        path: 'commerce',
        loadComponent: () => import('./pages/commerce/commerce.page').then(m => m.CommercePage),
      },
      {
        path: 'rubro-select',
        loadComponent: () => import('./pages/rubro-select/rubro-select.page').then( m => m.RubroSelectPage)
      },
      {
        path: 'notifications',
        data: {title: 'Notificaciones'},
        canActivate: [authGuard],
        component: NotificationsPage,
      }
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
  }
];
