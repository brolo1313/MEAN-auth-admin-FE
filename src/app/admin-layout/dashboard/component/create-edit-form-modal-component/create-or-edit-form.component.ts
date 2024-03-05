import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FavoriteService } from '../../../../shared/services/favorite-services';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import { StoreMarketsService } from '../../services/stored-markets-list.services';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-admin-create-or-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor, NgIf, QRCodeModule, MatFormFieldModule, MatInputModule,MatIconModule],
  templateUrl: './create-or-edit-form.component.html',
  styleUrls: ['./create-or-edit-form.component.scss']
})
export class AdminCreateOrEditFormComponent {

  favoriteService = inject(FavoriteService);
  fb = inject(UntypedFormBuilder);
  store = inject(StoreMarketsService);

  dataDialog = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<any>);



  marketList = this.store.getAllMarketsList();

  public copiedHint = 'Скопійовано';
  public qrCodeDownloadLink: SafeUrl = "";



  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public locationForm: UntypedFormGroup = this.fb.group({
    planId: ['', this.dataDialog?.isEdit ? null : [Validators.required]],
    planName: [{ value: '', disabled: false }],
    plantDescription: [{ value: '', disabled: false }],
    planLink: [{ value: '', disabled: false }],
  });

  get planLinkFC(): UntypedFormControl {
    return this.locationForm.get('planLink') as UntypedFormControl;
  }

  get planDescriptionFC(): UntypedFormControl {
    return this.locationForm.get('plantDescription') as UntypedFormControl;
  }

  ngOnInit() {

    if (this.dataDialog.isEdit) {
      console.log(this.dataDialog);
      this.fillForm(this.dataDialog.plan);
    }
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  public submit(locationForm: any) {
    if (locationForm.valid) {
      this.dialogRef.close({
        ...locationForm.value,
      });
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public copyInputMessage(valueToCopy: any) {
    navigator.clipboard.writeText(valueToCopy);
  }

  showTooltip(tooltip: any, copiedHint: string) {
    // tooltip.open({ copiedHint });
  }

  private fillForm(data: any) {
    this.locationForm.patchValue({
      planName: data.title,
      plantDescription: data.details,
      planLink: data.link,
      planId: data._id,
    });
  }
}
