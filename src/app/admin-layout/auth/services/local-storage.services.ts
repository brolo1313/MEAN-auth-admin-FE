import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private userSettingsStorageKey = 'auth';


  getUserSettings() {
    const userSettingsString = localStorage.getItem(this.userSettingsStorageKey);
    if (userSettingsString) {
      return  { ...JSON.parse(userSettingsString).userSettings };
    }
    return false;
  }
  setUserSettings(userSettings: any) {
    localStorage.setItem(this.userSettingsStorageKey, JSON.stringify({ userSettings: userSettings }));
  }

}
