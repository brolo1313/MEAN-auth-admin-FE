import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { HttpErrors } from './http-error.config';
import { inject } from '@angular/core';
import {
  MatSnackBar,

} from '@angular/material/snack-bar';
import { ToastService } from 'src/app/shared/services/toasts.service';

export const httpErrorsInterceptor: HttpInterceptorFn = (req, next) => {

  const authToken = '123'

  const toast = inject(ToastService);

  const openSnackBar = (message: any, status = '') => toast.openSnackBar(message, 'error');

  const modifiedRequest = req.clone({
    setHeaders:{
      bla:'some header'
    }
  })
  if (authToken) {
    // Clone the request and attach the token
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  return next(modifiedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorName: string = error?.name;
      const errorCode = error?.status;
      const errorMessage = error?.message;
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
            // this.authService.signOut();
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
            openSnackBar(error?.error?.ErrorMessage || 'Неочікувана помилка');
        }
      }
      return throwError(error);
    })
  )


};



