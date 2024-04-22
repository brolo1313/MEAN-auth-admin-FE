import { UsersService } from '../../services/users.service';
import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StoreUsersService } from '../../services/store-users.services';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contacs',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    MatIconModule
  ],
  styleUrl: './users.component.scss',
  templateUrl: './users.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsComponent {
  usersService = inject(UsersService);
  storeUsers = inject(StoreUsersService);

  ngOnInit() {
    this.usersService.getUsers();
  }
}
