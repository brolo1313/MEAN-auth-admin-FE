import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    provideRouter(routes),
    provideEnvironmentNgxMask(),
    provideHttpClient(), provideAnimationsAsync(),
  ]
};
