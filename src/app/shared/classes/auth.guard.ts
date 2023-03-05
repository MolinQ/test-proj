import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn:'root',
})
export class AuthGuard implements CanActivate {



  constructor(
    private auth:AuthService,
    private router:Router,
  ) {
  }

  canActivate():Observable<boolean> {
    if (this.auth.getToken()) {
      if (this.auth.isUser()) {
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
