import { TestBed } from '@angular/core/testing';
import { appState } from '../state/app.state';
import { ChatService } from './chat.service';
import { UserService } from './user.service';

describe('ChatService', () => {

  let chatService: ChatService;
  let userService: UserService;

  beforeEach(() => {
    appState.resetState();

    TestBed.configureTestingModule({});
    chatService = TestBed.inject(ChatService);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(chatService).toBeTruthy();
  });

  it('should have no messages', () => {
    expect(chatService.getMessages()).toEqual([]);
  });

  it('should send the message \'Hello World!\' from Kevin', () => {
    userService.loginUser('Kevin');
    chatService.sendMessage('Hello World!');
    expect(chatService.getMessages()[0].content).toEqual('Hello World!');
  });
});
