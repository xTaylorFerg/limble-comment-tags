import { signal, computed, WritableSignal } from '@angular/core';
import { Message, Notification, User } from '../interfaces';

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
    const sender = this.currentUser()?.username;
    if (!sender) return;
    const timestamp = new Date();
    const newMessage: Message = { sender, content, timestamp };
    const updatedMessages = [...this.messages(), newMessage];
    this.messages.set(updatedMessages);

    const notification: Notification = {
      from: sender,
      message: content,
      read: false,
      timestamp
    };
    this.notifyMentionedUsers(notification);
  }

  private notifyMentionedUsers(notification: Notification) {
    const updatedUsers = this.users().map(user => {
      if (notification.message.includes(`@${user.username}`)) {
        return {
          ...user,
          notifications: [...user.notifications, notification]
        };
      }
      return user;
    });
    this.users.set(updatedUsers);
  }

  getNotifications() {
    return this.currentUser()?.notifications || [];
  }

  readNotifications() {
    const updatedUsers = this.users().map(user => {
      if (user.username === this.getCurrentUsersName()) {
        let notifications = [];
        for (let n of user.notifications) {
          const notification: Notification = {
            from: n.from,
            message: n.message,
            read: true,
            timestamp: n.timestamp
          };
          notifications.push(notification);
        }
        user.notifications = notifications;
      }
      return user;
    });
    this.users.set(updatedUsers);
  }

  unreadNotifications() {
    const notifications = this.getNotifications();
    for (const notification of notifications) {
      if (!notification.read) {
        return true;
      }
    }
    return false;
  }
}

export const appState = new AppState();