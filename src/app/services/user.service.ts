import { Injectable } from '@angular/core';
import { appState } from '../state/app.state';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getCurrentUsersName() {
    return appState.getCurrentUsersName();
  }

  getUsers() {
    return appState.getUsers();
  }

  isUserLoggedIn() {
    return appState.isUserLoggedIn();
  }

  loginUser(username: string) {
    appState.loginUser(username);
  }

  logoutUser() {
    appState.logoutUser();
  }

}
