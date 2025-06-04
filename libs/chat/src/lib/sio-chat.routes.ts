import { Route } from '@angular/router';
import { SioAuthGuard} from '@silicia/auth';

export const sioChatRoutes: Route[] = [
  {
    path: 'chat',
    loadComponent: () =>
      import('./pages/chat').then((m) => m.SioChatPage),
      canActivate: [SioAuthGuard],
  },
  {
    path: 'chats',
    loadComponent: () =>
      import('./pages/chats').then((m) => m.SioChatsPage),
      canActivate: [SioAuthGuard],
  } 
];
