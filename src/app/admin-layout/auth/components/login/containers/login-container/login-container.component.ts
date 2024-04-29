import { CommonModule } from '@angular/common';
import { Component, Injectable, inject } from '@angular/core';
import { LoginComponent } from '../../component/login.component';
import { AuthService } from '../../../../services/auth.service';
import { AuthGoogleService } from 'src/app/admin-layout/auth/services/authGoogleService';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/admin-layout/auth/services/local-storage.services';


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-admin-login-container',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
  ],
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
})
export class AdminLoginContainer {
  private OauthService = inject(AuthGoogleService);
  private route = inject(ActivatedRoute);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  constructor(private authService: AuthService){
    this.route?.queryParams?.subscribe(params => {
      const userDataParam = params['userData'];
      if(userDataParam){
        const userData = JSON?.parse(decodeURIComponent(userDataParam));
        console.log('User data:', userData);
         this.localStorageService.setUserSettings(userData);
        this.router.navigate(['/admin/dashboard']);
      }
   
    });
  }
  public onLogin(loginData: any){
    this.authService.login(loginData)
  }

  public onGoogleAuthEmitter(){
    // this.authService.loginWithGoogle();
    console.log('google init');
    this.OauthService.login()
  }
}
