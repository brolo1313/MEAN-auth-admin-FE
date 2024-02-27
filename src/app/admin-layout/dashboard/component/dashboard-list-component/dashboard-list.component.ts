import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { StoreMarketsService } from '../../services/stored-markets-list.services';
import { SearchInputComponent } from '../../../../shared/components/input-search/input-search.component';
import { SearchBoxPipe } from '../../../../shared/pipes/search-box.pipe';


@Component({
  selector: 'app-admin-dashboard-list',
  standalone: true,
  imports: [CommonModule, NgFor, SearchInputComponent, SearchBoxPipe],
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
})
export class DashboardListComponent implements OnInit{

  store = inject(StoreMarketsService);

  userProfile = this.store.getAllMarketsList();

  @Output() createMarketProfile = new EventEmitter();
  @Output() editMarketProfile = new EventEmitter();
  @Output() deleteMarketProfile = new EventEmitter();
  @Output() getAllPlans = new EventEmitter();


  public byId = (item: any) => item?.id;
  public searchText!: string;


  ngOnInit() {
    this.getAllPlans.emit();
    console.log(this.userProfile);
  }


  get(){
    console.log('on init compoennt dash',  this.store.getAllMarketsList());
  }

  public addMarket() {
    
  }

  public deleteMarket(profileId: string) {
   
  }

  public editMarket(market: any) {
   
  }


}
