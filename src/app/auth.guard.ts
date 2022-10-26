import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {ConfigService} from "./services/config.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token: string | null

  constructor(private router: Router, private configService: ConfigService) {
    this.token = configService.getToken()
    this.configService.tokenUpdated.subscribe((token) => {
      this.token = token
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.token) {
      this.router.navigate(['/'])
    }
    return true;
  }
}
