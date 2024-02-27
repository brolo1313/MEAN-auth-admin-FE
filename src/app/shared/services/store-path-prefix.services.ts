import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorePathService {

  private baseHref = 'K-7';
  private localStorageKey = 'stored path'

  constructor() {}

  storePath(){
    let paths: string[] = location?.pathname?.split('/').splice(1, 1);
    let basePath: string = (paths && paths[0]) || this.baseHref; 

    const storedData: any = localStorage.getItem(this.localStorageKey);
    if (storedData === null && basePath !== 'chose-market-page' && basePath !== 'non-market-page') {
      localStorage.setItem(this.localStorageKey, JSON.stringify({pathUrl: basePath}));
    } 
   }
}
