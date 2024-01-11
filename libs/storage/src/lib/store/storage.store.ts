import { Injectable } from '@angular/core';

// SIO
import { SioCoreLoggerService } from '@silicia/core';

// NGXS - Store
import { NgxsOnInit, State } from '@ngxs/store';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import {
  Computed,
  DataAction,
  StateRepository,
} from '@angular-ru/ngxs/decorators';

//SIO STORAGE
import { SioStorageStateModel } from './storage.model';
import { SioStorageService } from '../services';
import { SioStorageFileListInterface } from '../interfaces';

@StateRepository()
@State<SioStorageStateModel>({
  name: 'storage',
  defaults: {
    bucket: '',
    query: [],
    files: { total: 0, files: [] },
  },
})
@Injectable()
export class SioStorageState
  extends NgxsDataRepository<SioStorageStateModel>
  implements NgxsOnInit
{
  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
    private sioStorageService: SioStorageService,
  ) {
    super();
  }

  override ngxsAfterBootstrap(): void {
      this.sioStorageService.SubscribeEvents().subscribe((event) => {
        this.sioCoreLoggerService.debug(`[SioStorageState][ngxAfterBootstrap] received events`);
        this.sioCoreLoggerService.trace(`[SioStorageState][ngxAfterBootstrap]`,event);
        console.log(event);
        if (event.payload.bucketId === this.snapshot.bucket) this.query() 
      });
  }

  @Computed()
  public get totals(): number | null {
    return this.snapshot.files.total;
  }

  @DataAction()
  public setBucket(value: string) {
    this.patchState({ bucket : value });
  }
  
  @DataAction()
  public async query(query?: string[], search?: string) {
    try {
      if (query) { this.ctx.patchState({ query: query})}
      const files: SioStorageFileListInterface | undefined =
        await this.sioStorageService.List(this.snapshot.bucket, this.snapshot.query, search);
      if (files) {
        this.patchState({ files: files });
      }
    } catch (e) {
      this.sioCoreLoggerService.error((e as Error).message);
    }
  }
}
