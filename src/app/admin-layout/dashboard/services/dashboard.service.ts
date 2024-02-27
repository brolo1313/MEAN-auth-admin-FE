import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { StoreMarketsService } from './stored-markets-list.services';
import { LocalStorageService } from '../../auth/services/local-storage.services';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  localStorageService = inject(LocalStorageService);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private storeService: StoreMarketsService) { }



  public getAllMarketsList() {

    return this.http.get(`${environment.apiUrl}/plans`).subscribe(
      (response) => {
        this.storeService.storedAllMarketsList(response);
      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    )
  }

  public createMarketProfile(body: any) {
    return {};
  }


  public deleteMarketProfile(profileId: string) {
    return null;
    
  }

  public editMarketProfile(profileId: string, body: any) {
    return {};
   
  }
}
