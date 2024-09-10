import { HighlightUsernamePipe } from './highlight-username.pipe';

describe('HighlightUsernamePipe', () => {
  let pipe: HighlightUsernamePipe;

  beforeEach(() => {
    pipe = new HighlightUsernamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the same value if no username is present', () => {
    const result = pipe.transform('This is a test string.');
    expect(result).toBe('This is a test string.');
  });

  it('should wrap the username with <strong> tags', () => {
    const result = pipe.transform('Hello @user1');
    expect(result).toBe('Hello <strong>@user1</strong>');
  });

  it('should handle multiple usernames in the string', () => {
    const result = pipe.transform('Hello @user1 and @user2');
    expect(result).toBe('Hello <strong>@user1</strong> and <strong>@user2</strong>');
  });

  it('should not highlight usernames without "@"', () => {
    const result = pipe.transform('Hello user1');
    expect(result).toBe('Hello user1');
  });

  it('should return the same value for an empty string', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });

  it('should handle usernames in the middle of sentences', () => {
    const result = pipe.transform('This is a message to @user1 about the project.');
    expect(result).toBe('This is a message to <strong>@user1</strong> about the project.');
  });

  it('should not highlight email addresses', () => {
    const result = pipe.transform('This is a message with an email address: test@google.com');
    expect(result).toBe('This is a message with an email address: test@google.com');
  })
});
