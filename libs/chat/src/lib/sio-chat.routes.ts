import { Route } from '@angular/router';
import { SioAuthGuard} from '@silicia/auth';

export const sioChatRoutes: Route[] = [
  {
    path: 'chat',
    loadChildren: () =>
      import('./pages/chat').then((m) => m.SioChatPageModule),
      canActivate: [SioAuthGuard],
  },
  {
    path: 'chat/list',
    loadChildren: () =>
      import('./pages/chat-list').then((m) => m.SioChatListPageModule),
      canActivate: [SioAuthGuard],
  } 
];
