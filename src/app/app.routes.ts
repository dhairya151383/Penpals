// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { LayoutComponent } from './shared/components/layout/layout.component';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Routes without the main layout (e.g., login, register)
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  // Routes that use the main layout (nav)
  {
    path: '', // This path will serve as the base for all children routes that need the layout
    component: LayoutComponent, // This component will contain the nav and its own router-outlet
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'articles/:id',
        loadComponent: () => import('./features/articles/article-details/article-details.component').then(m => m.ArticleDetailsComponent)
      },
      {
        path: 'create-article',
        loadComponent: () => import('./features/articles/article-create/article-create.component').then(m => m.ArticleCreateComponent),
        canActivate: [AuthGuard, RoleGuard],
        data: { expectedRole: 'author' }
      },
      {
        path: 'authors',
        loadComponent: () => import('./features/authors/author-list/author-list.component').then(m => m.AuthorListComponent)
      },
      // Wildcard route for 404 within the layout
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  // Fallback for any unmatched routes outside the layout
  { path: '**', redirectTo: 'login' }
];