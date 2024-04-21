import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,

  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { matchValidator } from 'src/app/admin-layout/auth/helpers/form-validators';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgIf, MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule],
})
export class ChangePasswordComponent {

  // @Output() private updatePassword = new EventEmitter();

  public form = this.fb.group({
    oldPassword: [null, Validators.required],
    newPassword: [null, [Validators.required,
                         Validators.minLength(8),
                         matchValidator('confirmPassword', true)]],
    confirmPassword: [null, [Validators.required,  matchValidator('newPassword')]],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router
  ) {}


  get oldPasswordFC(): UntypedFormControl {
    return this.form.get('oldPassword') as UntypedFormControl;
  }
  get newPasswordFC(): UntypedFormControl{
    return this.form.get('newPassword') as UntypedFormControl;
  }
  get confirmPasswordFC():UntypedFormControl {
    return this.form.get('confirmPassword') as UntypedFormControl;
  }

  public backClicked() {
    this.router.navigate(['/profile']);
  }

  public onSubmit(form:any): void {
    const {newPassword , oldPassword} = form.value;

  }
}
