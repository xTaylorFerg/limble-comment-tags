import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainNavbarComponent } from './main-navbar.component';
import { appState } from '../../state/app.state';
import { UserService } from '../../services';

describe('MainNavbarComponent', () => {

  let component: MainNavbarComponent;
  let fixture: ComponentFixture<MainNavbarComponent>;
  let userService: UserService;

  beforeEach(async () => {
    appState.resetState();

    await TestBed.configureTestingModule({
      imports: [MainNavbarComponent]
    })
    .compileComponents();
    userService = TestBed.inject(UserService);

    fixture = TestBed.createComponent(MainNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display login buttons for each preset user, when logged out', () => {
    userService.logoutUser();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#login-button-Kevin')?.textContent).toContain('Login as Kevin');
    expect(compiled.querySelector('#login-button-Jeff')?.textContent).toContain('Login as Jeff');
    expect(compiled.querySelector('#login-button-Bryan')?.textContent).toContain('Login as Bryan');
    expect(compiled.querySelector('#login-button-Gabbey')?.textContent).toContain('Login as Gabbey');
  });

  it('should display the logout button, user\'s name, and notifications button, when logged in', () => {
    userService.loginUser('Kevin');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#logout-button')).toBeTruthy();
    expect(compiled.querySelector('strong')?.textContent).toContain('Kevin');
    expect(compiled.querySelector('#notifications-button')).toBeTruthy();
  });
});
