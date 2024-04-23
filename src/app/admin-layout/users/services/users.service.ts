import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../auth/services/local-storage.services';
import { environment } from '../../../../environments/environment';
import { ToastService } from 'src/app/shared/services/toasts.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { StoreMarketsService } from '../../dashboard/services/stored-markets-list.services';
import { StoreUsersService } from './store-users.services';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  localStorageService = inject(LocalStorageService);
  toastService = inject(ToastService);
  store = inject(StoreUsersService);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }



  public getProfiles() {
    this.store.setIsLoadingAllUsers(true);
    return this.http.get(`${environment.apiUrl}/all-profiles`).subscribe(
      (response) => {
        this.store.storedAllUsers(response)
        this.store.setIsLoadingAllUsers(false);
      },
      (error) => {
        this.store.setIsLoadingAllUsers(false);
      }
    )
  }
  
}
