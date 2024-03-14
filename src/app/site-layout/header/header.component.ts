import { Component, Renderer2, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FavoriteService } from '../../shared/services/favorite-services';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  renderer = inject(Renderer2);
  favoriteService = inject(FavoriteService);
  router =inject(Router);

  public openModal(){
  
  }


  public navigateToChosePage(){
    this.router.navigate(['']);
  }
}
