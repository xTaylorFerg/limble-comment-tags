import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { appState } from '../../state/app.state';
import { ChatService, UserService } from '../../services';

describe('ChatComponent', () => {

  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatService: ChatService;
  let userService: UserService;

  beforeEach(async () => {
    appState.resetState();

    await TestBed.configureTestingModule({
      imports: [ChatComponent]
    })
    .compileComponents();

    chatService = TestBed.inject(ChatService);
    userService = TestBed.inject(UserService);

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display \'Hello World!\' in messages from Kevin.', () => {
    userService.loginUser('Kevin');
    chatService.sendMessage('Hello World!');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain('Hello World!');
  });

  it('should display \'No messages\' if there are no messages', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain('No messages');
  });

});