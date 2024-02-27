// market-prefix.guard.ts

import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/admin-layout/auth/services/local-storage.services';

@Injectable({
  providedIn: 'root',
})
export class MarketPrefixGuard implements CanActivate {

  localStorageService = inject(LocalStorageService);
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const dataFromLocalStorage = this.localStorageService.getMarketsPrefix();

    const urlMarketPrefix = route.paramMap.get('marketPrefix');

    if (!JSON.parse(dataFromLocalStorage!)!.includes(urlMarketPrefix!)) {
      this.router.navigate(['/non-market-page']);
      return false;
    }
    return true;
  }
}
