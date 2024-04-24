import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { HttpErrors } from './http-error.config';
import { inject } from '@angular/core';

import { ToastService } from 'src/app/shared/services/toasts.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const httpErrorsInterceptor: HttpInterceptorFn = (req, next) => {

  const toast = inject(ToastService);
  const authService = inject(AuthService);
  
  const openSnackBar = (message: any, status = '') => toast.openSnackBar(message, 'error');

  const localeStorage = localStorage?.getItem('auth');
  const accessToken = localeStorage ? JSON.parse(localeStorage).userSettings.accessToken : null;

  const modifiedRequest = req.clone({
    setHeaders: {
      Authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  })
  return next(modifiedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorName: string = error?.name;
      const errorCode = error?.status;
      const errorMessage = error?.error?.message;
      const errorOriginal = typeof error?.error?.error == 'string' ? error?.error?.error : '';

      const errorKey = Object.keys(error.error)[0];

      if (HttpErrors.hasOwnProperty(errorKey)) {
        let found = false;
        HttpErrors[errorKey].map((obj: any, index: any) => {
          const message = errorName === 'app_err_default' && errorMessage ? errorMessage : obj.notification;

          openSnackBar(message, obj.code);
          found = true;

          if (!found) {
            openSnackBar(errorMessage);
          }
        });
      } else {
        switch (error.status) {
          case 401:
            localStorage.clear();
            openSnackBar(`Ваша сесія застаріла. Увійдіть знову, код помилки: ${error.status}`);
            console.warn('!!!Redirect to the login page after!!!');
            authService.signOut();
            break;
          case 504:
          case 505:
            openSnackBar(`На данний момент сервер не доступний., код помилки: ${error.status}`);
            break;
          case 524:
            openSnackBar(`Виникла помилка, будь ласка зверністься до технічної підтримки, код помилки: ${error.status}`);
            break;
          case 404:
            openSnackBar(`Запитуваний ресурс недоступний, код помилки: ${error.status}`);
            break;
          default:
            openSnackBar(`${errorMessage} ${errorOriginal}` || 'Неочікувана помилка');
        }
      }
      return throwError(error);
    })
  )


};



