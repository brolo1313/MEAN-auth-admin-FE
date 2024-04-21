import { Component, Input, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {

  @Input() title: string = '';

  authService = inject(AuthService)
  router = inject(Router);

  public logOut(){
    this.authService.signOut();
  }

  public pathToLogin(){
    this.router.navigate(['/login']);
  }
}
