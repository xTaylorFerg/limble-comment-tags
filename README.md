# LimbleChat Message Tags

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

# Feature Description
Login as any of the users and send a chat message. Use @username to tag any of the other 3 users in a message. You can confirm the suggested selection with 'UP/DOWN' arrow keys and 'Enter' or use your mouse to click on one of the suggested names. Keep typing to filter out other names.

Logout and check the other user's perspective to see the Notification for that @username tag and the updated chat log.

Default users are Kevin, Jeff, Bryan, and Gabbey.

# Technical Approach
Refreshing the page will reset the data. This is a mock-up project for @username tagging in chat messages and the notification services for those tags.

Data is not persistent as there is no database. There is state management to hold the data until refresh. Components interact with the state via services.

There are components, interfaces, pipe(s), services, and a state(using Angular's Signal API). Components are styled using Bootstrap.
