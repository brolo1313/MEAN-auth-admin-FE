import { AfterViewInit, Component, ElementRef, inject } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FavoriteService } from 'src/app/shared/services/favorite-services';
import { Router } from '@angular/router';
import { PlanListService } from '../../services/plan-list.service';


@Component({
  selector: 'app-plan-list',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss'],
})
export class PlanListComponent  {

  menuServices = inject(PlanListService);
  router = inject(Router);

  public id = (item: any) => item?.id;
  
}
