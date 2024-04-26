import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
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
  imports: [ReactiveFormsModule, FormsModule, NgFor, NgIf, NgClass, QRCodeModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './create-or-edit-form.component.html',
  styleUrls: ['./create-or-edit-form.component.scss']
})
export class AdminCreateOrEditFormComponent {

  fb = inject(UntypedFormBuilder);
  store = inject(StoreMarketsService);

  dataDialog = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<any>);



  marketList = this.store.getPlans();

  public copiedHint = 'Скопійовано';
  public qrCodeDownloadLink: SafeUrl = "";



  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public locationForm: UntypedFormGroup = this.fb.group({
    title: [{ value: '', disabled: false }, [Validators.required]],
    details: [{ value: '', disabled: false, }],
    link: [{ value: '', disabled: false, }],
    logoImage: [''],
    coverImage: [''],

  });

  get planLinkFC(): UntypedFormControl {
    return this.locationForm.get('link') as UntypedFormControl;
  }

  get planDescriptionFC(): UntypedFormControl {
    return this.locationForm.get('details') as UntypedFormControl;
  }

  ngOnInit() {
    if (this.dataDialog.isEdit || this.dataDialog.isPreview) {
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
        id: this.dataDialog?.plan?.id ?? null,
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
      title: data.title,
      details: data.details,
      link: data.link,
    });
  }
}
