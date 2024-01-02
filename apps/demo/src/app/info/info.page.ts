import { Component } from '@angular/core';
import { SioCommonModule } from '@silicia/core';
import { SiliciaInfoFormState } from './info.page.state';
import { SioStoragePluginService } from '@silicia/storage';

@Component({
  selector: 'sio-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
  standalone: true,
  imports: [SioCommonModule],
})
export class InfoPageComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    public siliciaInfoFormState: SiliciaInfoFormState,
    private sioStoragePluginService: SioStoragePluginService,
  ) {}

  public async uploadImage() {
    console.log('special opne');
    this.sioStoragePluginService.Upload('test','uno', this.siliciaInfoFormState.file[0]); 
  }
}