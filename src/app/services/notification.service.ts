import { Injectable } from '@angular/core';
import { appState } from '../state/app.state';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  getNotifications() {
    return appState.getCurrentUserNotifications();
  }
}