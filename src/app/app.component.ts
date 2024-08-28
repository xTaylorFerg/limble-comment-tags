import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatComponent, MainNavbarComponent, NotificationsComponent, SendMessageComponent } from './components';
import { ChatService, UserService } from './services';
import { Message } from './interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ChatComponent,
    MainNavbarComponent,
    NotificationsComponent,
    SendMessageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  messages: Message[] = [];

  constructor(public chatService: ChatService, public userService: UserService) {
    effect(() => {
      this.messages = this.chatService.getMessages();
      this.scrollTimeout();
    });
  }

  scrollTimeout() {
    setTimeout(() => this.scrollFunction(), 1000);
  }

  scrollFunction() {
    const messagesContainer = document.getElementById('messages');
    if (!messagesContainer) return;
    messagesContainer.scrollTo({
      top: messagesContainer.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  }
}
