import { Component, ViewChild, } from '@angular/core';
import { NgIf, CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { settings_navigation } from './utils/settings-navigation';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgIf, NgFor, MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  navSettingsItems = settings_navigation;

  public openSidebar: boolean = false;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isCollapsed = true;
  isMobile = true;
  public titleHeader: string = '';


  constructor(private observer: BreakpointObserver, private router: Router, private route: ActivatedRoute) {
   
  }

  ngOnInit() {
   
  }


}
