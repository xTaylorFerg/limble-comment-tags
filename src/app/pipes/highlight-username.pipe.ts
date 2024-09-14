import { Pipe, PipeTransform, inject } from '@angular/core';
import { UserService } from '../services';

@Pipe({
  name: 'highlightUsername',
  standalone: true
})
export class HighlightUsernamePipe implements PipeTransform {

  private userService = inject(UserService);

  transform(value: string): string {
    if (!value) return value;

    // Get the list of valid usernames from UserService
    const users = this.userService.getUsers();
    const usernames = users.map(user => user.username);

    // Modify the regex to only highlight usernames that exist in the usernames array
    const usernamePattern = new RegExp(`(^|\\s)@(${usernames.join('|')})`, 'g');

    return value.replace(usernamePattern, '$1<strong>@$2</strong>');
  }

}
