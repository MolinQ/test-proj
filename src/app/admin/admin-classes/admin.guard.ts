import {
  CanActivate,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn:'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth:AuthService,
    private router:Router,
  ) {
  }

  canActivate():Observable<boolean> {
    if (this.auth.getToken()) {
      if (this.auth.isAdmin()) {
        return of(true);
      } else {
        this.auth.logOut();
        this.router.navigate(['/login'], {
          queryParams: {
            accessDenied: true,
          },
        });
        return of(false);
      }
    } else {
      this.auth.logOut();
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
