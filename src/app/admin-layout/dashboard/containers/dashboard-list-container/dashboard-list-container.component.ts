import { CommonModule } from '@angular/common';
import { Component, Injectable, inject } from '@angular/core';
import { DashboardListComponent } from '../../component/dashboard-list-component/dashboard-list.component';
import { DashboardService } from '../../services/dashboard.service';
import { IPlan } from '../../models/market.models';
import { AdminHeaderComponent } from '../../../header/admin-header.component';
import { StoreMarketsService } from '../../services/stored-markets-list.services';
import { UsersService } from 'src/app/admin-layout/users/services/users.service';
import { LocalStorageService } from 'src/app/admin-layout/auth/services/local-storage.services';


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-admin-dashboard-list-container',
  standalone: true,
  imports: [
    CommonModule,
    DashboardListComponent,
    AdminHeaderComponent,
  ],
  templateUrl: './dashboard-list-container.component.html',
  styleUrls: ['./dashboard-list-container.component.scss'],
})
export class AdminDashboardContainerComponent {

  private dashServices = inject(DashboardService);
  private    localStorageService = inject(LocalStorageService);
  store = inject(StoreMarketsService);

  private currentUser = this.localStorageService.getUserSettings();
  ngOnInit() {

  }

  public getAllPlans() {
    this.dashServices.getPlans();
  }
  public createPlan(data: IPlan) {
    delete data.id;
    const result = {
      ...data,
      authorId: this.currentUser.id
    }
    this.dashServices.createPlan(result);
  }

  public editPlan(data: IPlan) {
    const { id, logoImage, title, details, coverImage, link } = data;
    this.dashServices.editPlan({ id, body: { logoImage, title, details, coverImage, link } });
  }

  public deletePlan(data: any) {
    const { id } = data;
    const result = {
      id,
      currentUser: this.currentUser.id
    }
    if (id) this.dashServices.deletePlan(result);
  }
}
