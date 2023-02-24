import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {Observable, of} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn:"root"
})
export class AdminGuard implements CanActivate,CanActivateChild{
  constructor(
    private auth:AuthService,
    private router:Router
  ) {
  }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean>{
    if (this.auth.getToken()){
      if (this.auth.isAdmin()){
        return of(true);
      } else {
        this.auth.logOut()
        this.router.navigate(['/login'], {
          queryParams: {
            accessDenied: true
          }
        });
        return of(false);
      }
    } else {
      this.auth.logOut()
      this.router.navigate(['/login']);
      return of(false);
    }
  }

  canActivateChild(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean> {
    return this.canActivate(route,state)
  }
}
