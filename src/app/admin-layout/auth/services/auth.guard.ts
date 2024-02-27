import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.services';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private router: Router,
    private localStorageService : LocalStorageService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const isLogged = JSON.parse(this.localStorageService.getUserSettings()!);
    const userToken = isLogged?.userSettings?.authToken?.accessToken
    
    if(!userToken || !isLogged){
      this.router.navigate(['/admin/login'], { replaceUrl: true });
      return false;
    }
    return true;
  }
}
