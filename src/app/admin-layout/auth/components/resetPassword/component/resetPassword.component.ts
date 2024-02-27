import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Router } from '@angular/router';
import { ConfirmResetPasswordService } from '../../../services/confirm-reset-passwor.service';


@Component({
  selector: 'app-admin-reset-password',
  standalone: true,
  imports: [CommonModule, NgFor, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './resetPassword.component.html',
  styleUrls: ['./resetPassword.component.scss'],
})
export class ResetPasswordComponent {

 @Output() resetPassEmitter = new EventEmitter();

 resetPassService = inject(ConfirmResetPasswordService);

  public fb = inject(UntypedFormBuilder);
  public router = inject(Router);
  
  public resetForm: UntypedFormGroup = this.fb.group({
    phoneNumber: ['', [Validators.required]],
    code: [''],
  });

  public hide = true;

  public navigateBack(){
    this.router.navigate(['/admin/login']);
  }
  public submit(loginForm:any) {
    const data = loginForm.value;
    this.resetPassEmitter.emit(data);
  }
}
