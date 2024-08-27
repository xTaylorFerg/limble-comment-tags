import { signal, computed, WritableSignal } from '@angular/core';
import { Message, Notification, User } from '../interfaces';

export class AppState {

  // Signals for Users and Messages
  private users: WritableSignal<User[]> = signal<User[]>([
    { userID: 1, username: 'Kevin', isLoggedIn: false, notifications: [] },
    { userID: 2, username: 'Jeff', isLoggedIn: false, notifications: [] },
    { userID: 3, username: 'Bryan', isLoggedIn: false, notifications: [] },
    { userID: 4, username: 'Gabbey', isLoggedIn: false, notifications: [] },
  ]);

  private messages: WritableSignal<Message[]> = signal<Message[]>([]);

  // Computed Signal for Current User
  private currentUser = computed(() =>
    this.users().find(user => user.isLoggedIn)
  );

  // ---- User Functions ---- //

  isUserLoggedIn(): boolean {
    return !!this.currentUser();
  }

  getCurrentUsersName(): string | undefined {
    return this.currentUser()?.username;
  }

  getUsers(): User[] {
    return this.users();
  }

  loginUser(username: string): void {
    this.users.set(this.users().map(user =>
      ({ ...user, isLoggedIn: user.username === username })
    ));
  }

  logoutUser(): void {
    this.users.set(this.users().map(user => ({ ...user, isLoggedIn: false })));
  }

  // ---- Message Functions ---- //

  getMessages(): Message[] {
    return this.messages();
  }

  sendMessage(content: string): void {
    const sender = this.currentUser()?.username;
    if (!sender) return;
    const newMessage: Message = { sender, content, timestamp: new Date() };
    this.messages.set([...this.messages(), newMessage]);

    this.notifyMentionedUsers({
      from: sender,
      message: content,
      read: false,
      timestamp: new Date()
    });
  }

  // ---- Notification Functions ---- //

  private notifyMentionedUsers(notification: Notification): void {
    this.users.set(this.users().map(user =>
      notification.message.includes(`@${user.username}`)
        ? { ...user, notifications: [...user.notifications, notification] }
        : user
    ));
  }

  getNotifications(): Notification[] {
    return this.currentUser()?.notifications || [];
  }

  readNotifications(): void {
    this.users.set(this.users().map(user => {
      if (user.username === this.getCurrentUsersName()) {
        user.notifications = user.notifications.map(n => ({ ...n, read: true }));
      }
      return user;
    }));
  }

  unreadNotifications(): boolean {
    return this.getNotifications().some(notification => !notification.read);
  }
}

export const appState = new AppState();