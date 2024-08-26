import { Component } from '@angular/core';
import { UserService } from '../../services';

@Component({
  selector: 'app-user-selector',
  standalone: true,
  imports: [],
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent {

  constructor(public userService: UserService) {}

}