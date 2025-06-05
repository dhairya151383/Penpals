import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, combineLatest, from, of } from 'rxjs';
import { switchMap, map, take, filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Users } from './../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private firestore: Firestore,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data['expectedRole'] as string;
    const allowSelfEdit = route.data['allowSelfEdit'] === true;
    const routeId = route.paramMap.get('id');

    return combineLatest([
      this.authService.authReady$,
      this.authService.user$
    ]).pipe(
      filter(([ready]) => ready),
      take(1),
      switchMap(([_, user]) => {
        // 🔐 User not logged in → redirect to /login
        if (!user) {
          this.router.navigate(['/login']);
          return of(false);
        }

        // ✅ Allow self-edit if applicable
        if (allowSelfEdit && routeId && routeId === user.uid) {
          return of(true);
        }

        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        return from(getDoc(userDocRef)).pipe(
          map(docSnap => {
            const data = docSnap.data() as Users | undefined;
            const roles = data?.roles;

            // ❌ No roles found → access denied
            if (!roles) {
              return false;
            }

            // ✅ Admins always allowed
            if (roles.admin) {
              return true;
            }

            // ✅ Check for expected role
            if (roles[expectedRole as keyof typeof roles]) {
              return true;
            }

            // ❌ Role missing → access denied
            console.warn('Access Denied: User lacks role:', expectedRole);
            return false;
          })
        );
      })
    );
  }
}

