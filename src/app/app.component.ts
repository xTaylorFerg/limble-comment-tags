import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatComponent, UserSelectorComponent, NotificationsComponent } from './components';
import { UserService } from './services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ChatComponent,
    UserSelectorComponent,
    NotificationsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public userService: UserService) {}

}
