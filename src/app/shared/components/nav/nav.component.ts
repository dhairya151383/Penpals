import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUser } from './../../../core/services/auth.service'; // Import AppUser interface

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  canCreateOrEdit$: Observable<boolean>; // New observable

  constructor(public authService: AuthService) {
    // This observable will be true if the user is an admin OR an author
    this.canCreateOrEdit$ = this.authService.user$.pipe(
      map(user => {
        if (!user) {
          return false;
        }
        // Cast to AppUser to access roles property safely
        const appUser = user as AppUser;
        return appUser.roles?.admin === true || appUser.roles?.author === true;
      })
    );
  }
}