import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsComponent } from './notifications.component';
import { appState } from '../../state/app.state';
import { ChatService, UserService } from '../../services';

describe('NotificationsComponent', () => {

  let component: NotificationsComponent;
  let fixture: ComponentFixture<NotificationsComponent>;
  let chatService: ChatService;
  let userService: UserService;

  beforeEach(async () => {
    appState.resetState();

    await TestBed.configureTestingModule({
      imports: [NotificationsComponent]
    })
    .compileComponents();

    chatService = TestBed.inject(ChatService);
    userService = TestBed.inject(UserService);

    fixture = TestBed.createComponent(NotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should say \'No notifications available\'', () => {
    userService.loginUser('Kevin');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.textContent).toContain('No notifications available');
  });

  it('should have one notification', () => {
    userService.loginUser('Kevin');
    chatService.sendMessage('@Kevin is always talking to himself...');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#notification-0')).toBeTruthy();
  });
});
