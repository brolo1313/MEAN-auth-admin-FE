import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { StoreMarketsService } from 'src/app/admin-layout/dashboard/services/stored-markets-list.services';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule, NgxMaskDirective, LoaderComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

 @Output() loginEmitter = new EventEmitter();
 @Output() googleAuthEmitter = new EventEmitter();


  public fb = inject(UntypedFormBuilder);
  public router = inject(Router);
  public store = inject(StoreMarketsService);

  public loginForm: UntypedFormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public hide = true;

 
  public submit(loginForm:any) {
    const data = loginForm.value;
    this.loginEmitter.emit(data);
  }

  public singInWithGoogle(){
    this.googleAuthEmitter.emit();
  }

  public navigateToChosePage(){
    this.router.navigate(['/chose-market-page']);
  }

  public navigateToResetPage(){
    this.router.navigate(['/reset-password']);
  }
}
