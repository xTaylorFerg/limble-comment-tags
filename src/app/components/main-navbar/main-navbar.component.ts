import { Component } from '@angular/core';
import { NotificationService, UserService } from '../../services';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [],
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss'],
})
export class MainNavbarComponent {

  constructor(public notificationService: NotificationService, public userService: UserService) {}

}