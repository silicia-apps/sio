import { Component } from '@angular/core';
import { SioCommonModule } from '@silicia/core';

@Component({
  selector: 'sio-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
  standalone: true,
  imports: [SioCommonModule],
})
export class InfoPageComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}