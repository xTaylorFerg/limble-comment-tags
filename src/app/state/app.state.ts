import { signal, computed, WritableSignal } from '@angular/core';

export interface User {
  userID: number;
  username: string;
  isLoggedIn: boolean;
  notifications: string[];
}

export interface Message {
  sender: string;
  content: string;
  timestamp: Date;
}

export class AppState {
  private users: WritableSignal<User[]> = signal<User[]>([
    { userID: 1, username: 'Kevin', isLoggedIn: false, notifications: [] },
    { userID: 2, username: 'Jeff', isLoggedIn: false, notifications: [] },
    { userID: 3, username: 'Bryan', isLoggedIn: false, notifications: [] },
    { userID: 4, username: 'Gabbey', isLoggedIn: false, notifications: [] },
  ]);

  private messages: WritableSignal<Message[]> = signal<Message[]>([]);

  private currentUser = computed(() =>
    this.users().find(user => user.isLoggedIn)
  );

  isUserLoggedIn() {
    return (this.currentUser()?.isLoggedIn) ? true : false;
  }

  getCurrentUsersName() {
    return this.currentUser()?.username;
  }

  getUsers(): User[] {
    return this.users();
  }

  getMessages(): Message[] {
    return this.messages();
  }

  loginUser(username: string) {
    const updatedUsers = this.users().map(user =>
      user.username === username
        ? { ...user, isLoggedIn: true }
        : { ...user, isLoggedIn: false }
    );
    this.users.set(updatedUsers);
  }

  logoutUser() {
    const updatedUsers = this.users().map(user => ({ ...user, isLoggedIn: false }));
    this.users.set(updatedUsers);
  }

  sendMessage(content: string) {
    const sender = this.currentUser()?.username || 'anonymous';
    const newMessage: Message = { sender, content, timestamp: new Date() };
    const updatedMessages = [...this.messages(), newMessage];
    this.messages.set(updatedMessages);

    this.notifyMentionedUsers(content);
  }

  private notifyMentionedUsers(content: string) {
    const updatedUsers = this.users().map(user => {
      if (content.includes(`@${user.username}`)) {
        return {
          ...user,
          notifications: [...user.notifications, `You were mentioned in a chat by ${this.currentUser()?.username || 'anonymous'}`]
        };
      }
      return user;
    });
    this.users.set(updatedUsers);
  }

  getAllMessages() {
    return computed(() => this.messages());
  }

  getCurrentUserMessages() {
    return computed(() => this.messages().filter(message => message.sender === this.currentUser()?.username));
  }

  getCurrentUserNotifications() {
    return computed(() => this.currentUser()?.notifications || []);
  }
}

export const appState = new AppState();