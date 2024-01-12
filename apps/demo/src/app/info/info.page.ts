import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { SioCommonModule } from '@silicia/core';
import { SioStorageFileInterface, SioStorageState } from '@silicia/storage';
import { Query } from 'appwrite';

@Component({
  selector: 'sio-info',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss'],
  standalone: true,
  imports: [SioCommonModule, NgFor],
})
export class InfoPageComponent {
  constructor(
    public sioStorageState: SioStorageState,
  ) {
    
    this.sioStorageState.setBucket('test');
    this.sioStorageState.query([Query.equal('$id', ['mkt', 'promo', 'test'])]);
  }

  upload(event: SioStorageFileInterface[]) {
    this.sioStorageState.upload(event, 'promo')
  }

  delete(event: string | string[]) {
    console.log(event)
    this.sioStorageState.remove(event)
  }
}