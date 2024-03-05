import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { StoreMarketsService } from '../../services/stored-markets-list.services';
import { SearchInputComponent } from '../../../../shared/components/input-search/input-search.component';
import { SearchBoxPipe } from '../../../../shared/pipes/search-box.pipe';
import {
  MatDialog,
} from '@angular/material/dialog';
import { AdminCreateOrEditFormComponent } from '../create-edit-form-modal-component/create-or-edit-form.component';

@Component({
  selector: 'app-admin-dashboard-list',
  standalone: true,
  imports: [CommonModule, NgFor, SearchInputComponent, SearchBoxPipe],
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
})
export class DashboardListComponent implements OnInit {

  store = inject(StoreMarketsService);
  dialog = inject(MatDialog);

  userProfile = this.store.getAllMarketsList();

  @Output() createMarketProfile = new EventEmitter();
  @Output() editMarketProfile = new EventEmitter();
  @Output() deleteMarketProfile = new EventEmitter();
  @Output() getAllPlans = new EventEmitter();


  public byId = (item: any) => item?.id;
  public searchText!: string;


  ngOnInit() {
    this.getAllPlans.emit();
  }


  public addMarket() {

  }

  public deleteMarket(profileId: string) {

  }

  public editMarket(plan: any) {
    const dialogRef = this.dialog.open(AdminCreateOrEditFormComponent, {
      maxWidth: '400px',
      width: '100%',
      data: {
        isEdit: true,
        plan: plan,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result', result);
    });
  }

}
