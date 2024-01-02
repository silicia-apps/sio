import { Component } from '@angular/core';
import { SioCommonModule } from '@silicia/core';
import { SiliciaInfoFormState1, SiliciaInfoFormState2, SiliciaInfoFormState3 } from './info.page.state';
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
    public siliciaInfoFormState1: SiliciaInfoFormState1,
    public siliciaInfoFormState2: SiliciaInfoFormState2,
    public siliciaInfoFormState3: SiliciaInfoFormState3,
    private sioStoragePluginService: SioStoragePluginService,
  ) {}

  public async uploadFile1() {
    console.log('special opne');
    console.log(this.siliciaInfoFormState1.file.length);
    this.sioStoragePluginService.Upload('test','wingas', this.siliciaInfoFormState1.file[0]);
  }

  public async uploadFile2() {
    console.log('special opne');
    console.log(this.siliciaInfoFormState2.file.length);
    this.sioStoragePluginService.Upload('test','marketing', this.siliciaInfoFormState2.file[0]);
  }

  public async uploadFile3() {
  
    console.log(this.siliciaInfoFormState3.file.length);
    this.sioStoragePluginService.Upload('test','reminder', this.siliciaInfoFormState3.file[0]);
  }
}