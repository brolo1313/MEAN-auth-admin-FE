import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chose-market-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './non-market-page.component.html',
  styleUrls: ['./non-market-page.component.scss']
})
export class NonMarketPageComponent {

  private router = inject(Router);

  navigateToRoot() {
    this.router.navigate(['/chose-market-page']);
  }
}
