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
    const allowSelfEdit = route.data['allowSelfEdit'] === true; // This is for authors editing their own profile
    const routeId = route.paramMap.get('id'); // ID from the route, e.g., author ID for editing

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

        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        return from(getDoc(userDocRef)).pipe(
          map(docSnap => {
            const data = docSnap.data() as Users | undefined;
            const roles = data?.roles;

            // ❌ No roles found → access denied
            if (!roles) {
              this.router.navigate(['/']); // Redirect to a safe page or dashboard
              return false;
            }

            // ✅ Admins always allowed, regardless of expected role or self-edit
            // This check should ideally come first after user login and role retrieval
            if (roles.admin) {
              return true;
            }

            // ✅ Allow self-edit if applicable (e.g., author editing their own profile)
            // This is checked only if the user is NOT an admin
            if (allowSelfEdit && routeId && routeId === user.uid) {
                // Ensure the user also has the expected role if self-edit is intended for specific roles
                // For example, an author editing their own profile
                if (roles[expectedRole as keyof typeof roles]) {
                    return true;
                }
            }


            // ✅ Check for expected role (for non-admin users)
            if (expectedRole && roles[expectedRole as keyof typeof roles]) {
              return true;
            }

            // ❌ Role missing and not admin → access denied
            console.warn('Access Denied: User lacks role:', expectedRole || 'general access');
            this.router.navigate(['/']); // Redirect to a safe page or dashboard
            return false;
          })
        );
      })
    );
  }
}