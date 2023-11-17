import { Component } from '@angular/core';
import { SioCommonModule } from '@silicia/core';

@Component({
  selector: 'sio-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
  standalone: true,
  imports: [SioCommonModule],
})
export class SettingsPageComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}