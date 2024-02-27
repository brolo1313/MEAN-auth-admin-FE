import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private userSettingsStorageKey = 'auth';
  private marketPrefixesStorageKey = 'prefixes';


  constructor() {
  }


  getUserSettings() {
    return localStorage.getItem(this.userSettingsStorageKey);
  }
  setUserSettings(userSettings:any) {
    localStorage.setItem(this.userSettingsStorageKey, JSON.stringify({ userSettings: userSettings }));
  }

  setMarketsPrefix(marketsPrefix:any) {
    localStorage.setItem(this.marketPrefixesStorageKey, JSON.stringify( marketsPrefix ));
  }

  getMarketsPrefix() {
    return localStorage.getItem(this.marketPrefixesStorageKey);
  }
}
