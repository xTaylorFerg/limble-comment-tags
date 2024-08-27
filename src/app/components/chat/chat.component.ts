import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, UserService } from '../../services';
import { User } from '../../interfaces'

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {

  @ViewChild('messageInput') messageInputRef!: ElementRef<HTMLInputElement>;
  messageText: string = '';
  showSuggestions: boolean = false;
  suggestions: User[] = [];
  selectedSuggestionIndex: number = -1;

  constructor(public chatService: ChatService, public userService: UserService) {}
  
  onKeyup(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    const atIndex = value.lastIndexOf('@');

    if (atIndex !== -1) {
      const query = value.slice(atIndex + 1);
      this.suggestions = this.userService.getUsers().filter(user => user.username.toLowerCase().startsWith(query.toLowerCase()));
      this.showSuggestions = true;
    } else {
      this.showSuggestions = false;
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' && this.showSuggestions) {
      this.selectedSuggestionIndex = Math.min(this.selectedSuggestionIndex + 1, this.suggestions.length - 1);
      event.preventDefault();
    } else if (event.key === 'ArrowUp' && this.showSuggestions) {
      this.selectedSuggestionIndex = Math.max(this.selectedSuggestionIndex - 1, 0);
      event.preventDefault();
    } else if (event.key === 'Enter' && this.selectedSuggestionIndex !== -1 && this.showSuggestions) {
      this.onSelectSuggestion(this.suggestions[this.selectedSuggestionIndex].username);
      event.preventDefault();
    } else if (this.messageText && event.key === 'Enter' && this.selectedSuggestionIndex === -1) {
      this.chatService.sendMessage(this.messageText);
      this.messageText = '';
      this.suggestions = [];
      this.showSuggestions = false;
      event.preventDefault();
    }
  }

  onSelectSuggestion(suggestion: string) {
    const atIndex = this.messageText.lastIndexOf('@');
    if (atIndex !== -1) {
      this.messageText = this.messageText.slice(0, atIndex + 1) + suggestion + ' ';
    }

    this.suggestions = [];
    this.showSuggestions = false;
    this.selectedSuggestionIndex = -1;
    this.focusOnInput();
  }

  focusOnInput() {
    this.messageInputRef.nativeElement.focus();
    const length = this.messageText.length;
    this.messageInputRef.nativeElement.setSelectionRange(length, length);
  }

}