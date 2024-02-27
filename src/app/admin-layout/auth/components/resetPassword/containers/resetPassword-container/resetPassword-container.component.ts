import { CommonModule } from '@angular/common';
import { Component, Injectable, inject } from '@angular/core';
import { ResetPasswordComponent } from '../../component/resetPassword.component';
import { ConfirmResetPasswordService } from '../../../../services/confirm-reset-passwor.service';
import { AuthService } from '../../../../services/auth.service';


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-admin-reset-pass-container',
  standalone: true,
  imports: [
    CommonModule,
    ResetPasswordComponent,
  ],
  templateUrl: './resetPassword-container.component.html',
  styleUrls: ['./resetPassword-container.component.scss'],
})
export class AdminResetPasswordContainer {

  resetPassService = inject(ConfirmResetPasswordService);
  authService = inject(AuthService);

  public onResetPassword(data: any) {
    if (data.code && data.code.length) {
      const confirmationData = this.resetPassService.getConfirmationData();
      const result = {
        ...data,
        operationId: confirmationData.opertionId
      }
      this.authService.forgotPwConfirm(result)
    } else {
      delete data.code;
      this.authService.forgotPwRequest(data)
    }
  }
}
