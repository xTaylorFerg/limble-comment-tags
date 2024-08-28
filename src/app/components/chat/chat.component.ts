import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightUsernamePipe } from '../../pipes';
import { ChatService, UserService } from '../../services';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, HighlightUsernamePipe],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {

  constructor(public chatService: ChatService, public userService: UserService) {}

}