import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { LoginComponent } from '../../component/login.component';
import { AuthService } from '../../../../services/auth.service';


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
  

  constructor(private authService: AuthService){

  }
  public onLogin(loginData: any){
    this.authService.login(loginData)
  }
}
