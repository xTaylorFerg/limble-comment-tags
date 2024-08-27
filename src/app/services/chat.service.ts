import { Injectable } from '@angular/core';
import { appState } from '../state/app.state';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  getMessages() {
    return appState.getMessages();
  }

  sendMessage(content: string) {
    appState.sendMessage(content);
  }

}