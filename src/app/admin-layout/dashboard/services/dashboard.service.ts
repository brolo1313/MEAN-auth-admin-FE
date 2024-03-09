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



  public getPlans() {
    this.storeService.setDataIsLoadingMarketsProfilesList(true)
    return this.http.get(`${environment.apiUrl}/plans`).subscribe(
      (response) => {
        this.storeService.storedAllMarketsList(response);
        this.storeService.setDataIsLoadingMarketsProfilesList(false);
      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    )
  }

  public createPlan(body: any) {
    return this.http.post(`${environment.apiUrl}/plan` , {
      ...body
    }).subscribe(
      (response) => {
        this.getPlans();
      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    )
  }


  public deletePlan(planId: string) {
    return this.http.delete(`${environment.apiUrl}/plans/${planId}`).subscribe(
      (response) => {
        this.getPlans();
      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    );
  }

  public editPlan(data:any) {
    return this.http.put(`${environment.apiUrl}/plan/${data.id}`, data.body, {
    }).subscribe(
      (updatedMarket) => {
        this.getPlans();
      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    );
   
  }
}
