import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';


@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

 @Output() loginEmitter = new EventEmitter();

  public fb = inject(UntypedFormBuilder);
  public router = inject(Router);


  public loginForm: UntypedFormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  public hide = true;

 
  public submit(loginForm:any) {
    const data = loginForm.value;
    this.loginEmitter.emit(data);
  }

  public navigateToChosePage(){
    this.router.navigate(['/chose-market-page']);
  }

  public navigateToResetPage(){
    this.router.navigate(['/reset-password']);
  }
}
