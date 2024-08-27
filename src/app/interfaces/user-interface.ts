import { Notification } from './notification-interface';

export interface User {
  userID: number;
  username: string;
  isLoggedIn: boolean;
  notifications: Notification[];
}
