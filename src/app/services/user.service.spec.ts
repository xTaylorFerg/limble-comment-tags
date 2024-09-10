import { TestBed } from '@angular/core/testing';
import { appState } from '../state/app.state';
import { UserService } from './user.service';

describe('UserService', () => {

  let service: UserService;

  beforeEach(() => {
    appState.resetState();

    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test the user is logged in', () => {
    service.loginUser('Kevin');
    expect(service.isUserLoggedIn()).toBeTruthy();
  });

  it('should test the user is not logged in', () => {
    service.loginUser('Kevin');
    service.logoutUser();
    expect(service.isUserLoggedIn()).toBeFalsy();
  });

  it('should get the current logged in user\'s name', () => {
    service.loginUser('Gabbey');
    expect(service.getCurrentUsersName()).toBe('Gabbey');
  });
});
