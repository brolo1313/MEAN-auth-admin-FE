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
  ) { }



  public getPlans(callLoader = true) {
    if (callLoader) {
      this.store.setDataIsLoadingMarketsProfilesList(true);

    }
    return this.http.get(`${environment.apiUrl}/plans`).subscribe(
      (response) => {
        this.store.storedAllMarketsList(response)
        if (callLoader) {
          this.store.setDataIsLoadingMarketsProfilesList(false);

        }
      },
      (error) => {
        this.store.setDataIsLoadingMarketsProfilesList(false);
      }
    )
  }

  public createPlan(body: any) {
    this.store.setDataIsLoadingMarketsProfilesList(true);
    return this.http.post(`${environment.apiUrl}/plan`, {
      ...body
    }).subscribe(
      (response) => {
        this.getPlans(false);
        this.store.setDataIsLoadingMarketsProfilesList(false);
        this.toastService.openSnackBar('Створення успішне', 'successful', 'top');
      },
      (error) => {
        this.store.setDataIsLoadingMarketsProfilesList(false);
      }
    )
  }


  public deletePlan(planId: string) {
    this.store.setDataIsLoadingMarketsProfilesList(true);
    return this.http.delete(`${environment.apiUrl}/plans/${planId}`).subscribe(
      (response) => {
        this.getPlans(false);
        this.store.setDataIsLoadingMarketsProfilesList(false);
        this.toastService.openSnackBar('Видалення успішне', 'successful-delete', 'top');
      },
      (error) => {
        this.store.setDataIsLoadingMarketsProfilesList(false);
      }
    );
  }

  public editPlan(data: any) {
    this.store.setDataIsLoadingMarketsProfilesList(true);
    return this.http.put(`${environment.apiUrl}/plan/${data.id}`, data.body, {
    }).subscribe(
      (updatedMarket) => {
        this.getPlans(false);
        this.store.setDataIsLoadingMarketsProfilesList(false);
        this.toastService.openSnackBar('Редагування успішне', 'successful-edit', 'top');
      },
      (error) => {
        this.store.setDataIsLoadingMarketsProfilesList(false);
      }
    );

  }
}
