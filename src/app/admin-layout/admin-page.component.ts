import { Component, ViewChild, } from '@angular/core';
import { NgIf, CommonModule, NgFor } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AdminHeaderComponent } from './header/admin-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { navigation } from './navigation/navigation';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule , NgIf, NgFor, AdminHeaderComponent, AdminHeaderComponent, MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  navItems = navigation;

  public openSidebar: boolean = false;

  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isCollapsed = true;
  isMobile= true;
  title: string = '';

  constructor(private observer: BreakpointObserver , private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event:any) => {
      console.log(event.urlAfterRedirects);
      // Extract the route's data to get the title
      // const routeTitle = this.getTitleFromRoute(this.router.routerState, this.router.routerState.root).join(' | ');
      // this.title = routeTitle;
    });
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.openSidebar = false;
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }


  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

  navigateToPage(item:any){
    this.router.navigate([item.url]);
    this.title = item.title;
  }

}
