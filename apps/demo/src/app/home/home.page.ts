import { Component } from '@angular/core';
import { SioCommonModule } from '@silicia/core';
import { SiliciaHomePageState } from './store/home.store';
import {
  SioStoragePluginService,
  sioStorageFileInterface,
} from '@silicia/storage';

@Component({
  selector: 'sio-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [SioCommonModule],
})
export class HomePageComponent {
  constructor(
    public siliciaHomePageState: SiliciaHomePageState,
    private sioStoragePluginService: SioStoragePluginService,
  ) {}

  public uploadMKT(event: sioStorageFileInterface[]) {
    this.sioStoragePluginService.Upload('65589a4fcd66026aba94','mkt', event[0]);
  }

  public uploadINVOICES(event: sioStorageFileInterface[]) {
    this.sioStoragePluginService.Upload('65589a4fcd66026aba94','wingas', event[0]);
  }
}
