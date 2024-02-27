import { Component, } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from './header/admin-header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, NgIf, AdminHeaderComponent],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

}
