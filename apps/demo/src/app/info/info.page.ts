import { Component } from '@angular/core';
import { SioCommonModule } from '@silicia/core';
import { SioStorageState } from '@silicia/storage';

@Component({
  selector: 'sio-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
  standalone: true,
  imports: [SioCommonModule],
})
export class InfoPageComponent {
  constructor(
    public sioStorageState: SioStorageState,
  ) {}

  test() {
    this.sioStorageState.setBucket('test');
    this.sioStorageState.query();
  }
}