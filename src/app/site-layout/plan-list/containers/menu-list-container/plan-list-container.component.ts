import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { PlanListComponent } from '../../component/menu-list-component/plan-list.component';


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-plan-list-container',
  standalone: true,
  imports: [
    CommonModule,
    PlanListComponent,
  ],
  templateUrl: './plan-list-container.component.html',
  styleUrls: ['./plan-list-container.component.scss'],
})
export class PlanListContainerComponent {
  
}
