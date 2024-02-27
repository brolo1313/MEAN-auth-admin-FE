import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FavoriteService } from '../../../../shared/services/favorite-services';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import { StoreMarketsService } from '../../services/stored-markets-list.services';


@Component({
  selector: 'app-admin-create-or-edit-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor, NgIf, QRCodeModule],
  templateUrl: './create-or-edit-form.component.html',
  styleUrls: ['./create-or-edit-form.component.scss']
})
export class AdminCreateOrEditFormComponent {

  favoriteService = inject(FavoriteService);
  fb = inject(UntypedFormBuilder);
  store = inject(StoreMarketsService);



  marketList = this.store.getAllMarketsList();

  public copiedHint = 'Скопійовано';
  public qrCodeDownloadLink: SafeUrl = "";



  @Input() public market!: any;
  @Input() public isEdit!: any;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  public locationForm!: UntypedFormGroup;

  get marketPathFC(): UntypedFormControl {
    return this.locationForm.get('marketPath') as UntypedFormControl;
  }

  get marketIndexFC(): UntypedFormControl {
    return this.locationForm.get('marketIndex') as UntypedFormControl;
  }

  ngOnInit() {

    this.locationForm = this.fb.group({
      marketId: ['', this.isEdit ? null : [Validators.required]],
      marketName: [{ value: '', disabled: true }],
      marketIndex: [{ value: '', disabled: true }],
      marketPath: [{ value: '', disabled: true }],
    });

    if (this.market) {
      this.fillForm(this.market);
    }
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  public submit(locationForm: any) {
  
  }

  public updateFormValue(event: any) {
    const selectedMarket = this.marketList.find(
      (market: any) => market.marketId == event.target.value
    );

    if (selectedMarket) {
      this.fillForm(selectedMarket);
    }
  }

  public copyInputMessage(valueToCopy: any) {
    navigator.clipboard.writeText(valueToCopy);
  }

  showTooltip(tooltip: any, copiedHint: string) {
    // tooltip.open({ copiedHint });
  }

  private fillForm(data: any) {
    // this.locationForm.patchValue({
    //   marketName: data.fullName ?? data.nameLabel,
    //   marketIndex: data.docPrefix,
    //   marketPath: `food.epicentrk.ua/${data.docPrefix}`,
    //   marketId: data.marketId,
    // });
  }
}
