import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "./local-storage.services";
import { ConfirmResetPasswordService } from "./confirm-reset-passwor.service";
import { environment } from "src/environments/environment";
import { ToastService } from "src/app/shared/services/toasts.service";
import { StoreMarketsService } from "../../dashboard/services/stored-markets-list.services";

export interface USER_CREDENTIALS {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any;

  resetPassService = inject(ConfirmResetPasswordService);
  http = inject(HttpClient);
  router = inject(Router);
  localStorageService = inject(LocalStorageService);
  toastService = inject(ToastService);
  store = inject(StoreMarketsService);

  login(loginData: USER_CREDENTIALS) {
    this.store.setDataIsLoadingMarketsProfilesList(true);
    return this.http.post(`${environment.apiUrl}/sign-in`, loginData ).subscribe(
      (response) => {
        this.localStorageService.setUserSettings(response);
        this.router.navigate(['/admin/dashboard']);
        this.store.setDataIsLoadingMarketsProfilesList(false);
      },
      (error) => {
        this.store.setDataIsLoadingMarketsProfilesList(false);
      }
    );
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public forgotPwRequest(user: any) {
    return this.http.put(`${environment.apiUrl}/system/common/tokens/auth/password/reset/request`, user).subscribe(
      (response) => {
          this.resetPassService.setIsConfirmed(true)
          this.resetPassService.setConfirmationData(response)
      },
      (error) => {
        if(error.status === 500) {
          // this.toastService.show('Помилка на сервері',  { classname: 'bg-danger text-light', delay: 3000 });
        }
      }
    );
  }

  public forgotPwConfirm(user: any) {
    return this.http.put(`${environment.apiUrl}/system/common/tokens/auth/password/reset/confirm`, user).subscribe(
      (response) => {
        // this.toastService.show('Пароль вислано',  { classname: 'bg-success text-light', delay: 3000 });
        this.router.navigate(['/admin/login']);
      },
      (error) => {
        if(error.status === 500) {
          // this.toastService.show('Помилка на сервері',  { classname: 'bg-danger text-light', delay: 3000 });
        }
      }
    );
  }
 
}

