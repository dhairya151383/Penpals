// src/app/core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.authService.authReady$,
      this.authService.user$
    ]).pipe(
      filter(([ready]) => ready),
      take(1),
      map(([_, user]) => {
        if (user) return true;
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
