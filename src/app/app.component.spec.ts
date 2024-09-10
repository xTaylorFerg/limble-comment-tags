import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { appState } from './state/app.state';
import { UserService } from './services';

describe('AppComponent', () => {

  let userService: UserService;

  beforeEach(async () => {
    appState.resetState();

    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    userService = TestBed.inject(UserService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('LimbleChat');
  });

  it('should display #messages div when logged in', () => {
    const fixture = TestBed.createComponent(AppComponent);
    userService.loginUser('Kevin');
    fixture.detectChanges();
    const messagesDiv = fixture.nativeElement.querySelector('#messages');
    expect(messagesDiv).toBeTruthy();
  });

  it('should not display #messages div when logged out', () => {
    const fixture = TestBed.createComponent(AppComponent);
    userService.logoutUser();
    fixture.detectChanges();
    const messagesDiv = fixture.nativeElement.querySelector('#messages');
    expect(messagesDiv).toBeFalsy();
  });
});
