import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data['expectedRole'] as string;

    return this.authService.user$.pipe(
      take(1),
      map(user => {
        if (user) {
          const userRoles = this.authService.getUserRoles(user.uid);
          if (userRoles.includes(expectedRole)) {
            return true;
          } else {
            this.router.navigate(['/dashboard']);
            console.warn('Access Denied: User does not have the required role.');
            return false;
          }
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}