import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private oAuthService = inject(OAuthService);
  private router = inject(Router);

  constructor() {
    this.initConfiguration();
    console.log(window.location.origin);
  }

  initConfiguration() {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '64531276471-rsgodsdm2879qssn0kvo3pkmtni0q1d5.apps.googleusercontent.com',
      redirectUri: 'http://localhost:3000/api/auth/google/callback',

      scope: 'openid profile email',
    };
    this.oAuthService.configure(authConfig);
    // this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin()
    .then(() => console.log('Discovery document loaded successfully'))
    .catch(error => console.error('Error loading discovery document:', error));
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  // logout() {
  //   this.oAuthService.revokeTokenAndLogout();
  //   this.oAuthService.logOut();
  // }

  // getProfile() {
  //   const profile = this.oAuthService.getIdentityClaims();
  //   return profile;
  // }

  // getToken() {
  //   return this.oAuthService.getAccessToken();
  // }
}