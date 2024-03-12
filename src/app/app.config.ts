import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { httpErrorsInterceptor } from './admin-layout/interceptor/http-errors.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    provideRouter(routes),
    provideEnvironmentNgxMask(),
    provideHttpClient(), provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors(
        [httpErrorsInterceptor,]
      )
    )
  ]
};
