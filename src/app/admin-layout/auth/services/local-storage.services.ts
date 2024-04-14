import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private userSettingsStorageKey = 'auth';


  getUserSettings() {
    return localStorage.getItem(this.userSettingsStorageKey);
  }
  setUserSettings(userSettings: any) {
    localStorage.setItem(this.userSettingsStorageKey, JSON.stringify({ userSettings: userSettings }));
  }

}
