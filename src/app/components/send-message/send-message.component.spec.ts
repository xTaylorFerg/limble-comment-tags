import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { SendMessageComponent } from './send-message.component';
import { appState } from '../../state/app.state';
import { ChatService, UserService } from '../../services';

describe('SendMessageComponent', () => {
  let component: SendMessageComponent;
  let fixture: ComponentFixture<SendMessageComponent>;
  let chatService: ChatService;
  let userService: UserService;
  let messageInput: HTMLInputElement;

  beforeEach(async () => {
    appState.resetState();

    const chatServiceMock = {
      sendMessage: jasmine.createSpy('sendMessage'),
    };

    const userServiceMock = {
      getUsers: jasmine.createSpy('getUsers').and.returnValue([
        { username: 'user1' },
        { username: 'user2' },
        { username: 'johnDoe' },
        { username: 'janeDoe' },
      ]),
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, SendMessageComponent],
      providers: [
        { provide: ChatService, useValue: chatServiceMock },
        { provide: UserService, useValue: userServiceMock },
      ]
    })
    .compileComponents();

    chatService = TestBed.inject(ChatService);
    userService = TestBed.inject(UserService);

    fixture = TestBed.createComponent(SendMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    messageInput = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send a message on button click', () => {
    messageInput.value = 'Hello world!';

    const sendButton = fixture.debugElement.query(By.css('button')).nativeElement;
    sendButton.click();

    expect(chatService.sendMessage).toHaveBeenCalledWith('Hello world!');
    expect(messageInput.value).toBe('');
  });

  it('should update suggestions on keyup with "@" symbol', () => {
    messageInput.value = '@jo';

    const keyupEvent = new KeyboardEvent('keyup');
    messageInput.dispatchEvent(keyupEvent);

    expect(component.suggestions.length).toBe(1);
    expect(component.suggestions[0].username).toBe('johnDoe');
  });

  it('should handle ArrowDown keydown event to select suggestion', () => {
    messageInput.value = '@j';

    const keyupEvent = new KeyboardEvent('keyup');
    messageInput.dispatchEvent(keyupEvent);

    const keydownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    messageInput.dispatchEvent(keydownEvent);
    messageInput.dispatchEvent(keydownEvent);

    expect(component.selectedSuggestionIndex).toBe(1);
  });
});
