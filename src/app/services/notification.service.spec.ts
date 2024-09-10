import { TestBed } from '@angular/core/testing';
import { appState } from '../state/app.state';
import { NotificationService } from './notification.service';
import { UserService } from './user.service';
import { ChatService } from './chat.service';

describe('NotificationService', () => {

  let notificationService: NotificationService;
  let chatService: ChatService;
  let userService: UserService;

  beforeEach(() => {
    appState.resetState();

    TestBed.configureTestingModule({});
    notificationService = TestBed.inject(NotificationService);
    chatService = TestBed.inject(ChatService);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(notificationService).toBeTruthy();
  });

  it('should have no notifications because no user is logged in', () => {
    expect(notificationService.getNotifications()).toEqual([]);
  });

  it('should have no notifications for Kevin', () => {
    userService.loginUser('Kevin');
    expect(notificationService.getNotifications()).toEqual([]);
  });

  it('should have a notification from Kevin talking to himself...', () => {
    userService.loginUser('Kevin');
    chatService.sendMessage('@Kevin is talking to himself...');
    expect(notificationService.getNotifications()[0].from).toBe('Kevin');
  });
});
