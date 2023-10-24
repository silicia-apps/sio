import { Component } from '@angular/core';
import { SioCommonModule } from '@silicia/core';

@Component({
  selector: 'sio-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [SioCommonModule],
})
export class HomePageComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
