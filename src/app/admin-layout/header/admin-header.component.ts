import { Component, Input, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '../auth/services/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageService } from '../auth/services/local-storage.services';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterModule, NgIf, MatMenuModule, MatDividerModule, MatIconModule],
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {

  @Input() title: string = '';

  authService = inject(AuthService)
  router = inject(Router);
  localStorage = inject(LocalStorageService);

  userSettings: any;

  ngOnInit(): void {
    const userSettingsString = this.localStorage.getUserSettings();
    if (userSettingsString) {
      this.userSettings = { ...JSON.parse(userSettingsString).userSettings };
    }
  }

  public logOut() {
    this.authService.signOut();
  }

  public pathToLogin() {
    this.router.navigate(['/login']);
  }
}
