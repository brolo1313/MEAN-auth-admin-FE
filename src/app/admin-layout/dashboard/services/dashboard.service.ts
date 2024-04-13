import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { StoreMarketsService } from './stored-markets-list.services';
import { LocalStorageService } from '../../auth/services/local-storage.services';
import { environment } from '../../../../environments/environment';
import { ToastService } from 'src/app/shared/services/toasts.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  localStorageService = inject(LocalStorageService);
  toastService = inject(ToastService);
  store = inject(StoreMarketsService);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private storeService: StoreMarketsService) { }



  public getPlans() {
    this.store.setDataIsLoadingMarketsProfilesList(true);
    this.storeService.setDataIsLoadingMarketsProfilesList(true)
    return this.http.get(`${environment.apiUrl}/plans`).subscribe(
      (response) => {
        this.storeService.storedAllMarketsList(response);
        this.storeService.setDataIsLoadingMarketsProfilesList(false);
      }
    )
  }

  public createPlan(body: any) {
    return this.http.post(`${environment.apiUrl}/plan`, {
      ...body
    }).subscribe(
      (response) => {
        this.getPlans();
        this.toastService.openSnackBar('Створення успішне', 'successful', 'top')
      }
    )
  }


  public deletePlan(planId: string) {
    return this.http.delete(`${environment.apiUrl}/plans/${planId}`).subscribe(
      (response) => {
        this.getPlans();
        this.toastService.openSnackBar('Видалення успішне', 'successful-delete', 'top')
      }
    );
  }

  public editPlan(data: any) {
    return this.http.put(`${environment.apiUrl}/plan/${data.id}`, data.body, {
    }).subscribe(
      (updatedMarket) => {
        this.getPlans();
        this.toastService.openSnackBar('Редагування успішне', 'successful-edit', 'top')
      }
    );

  }
}
