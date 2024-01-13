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
import { SioStorageFileInterface, SioStorageFileListInterface } from '../interfaces';

@StateRepository()
@State<SioStorageStateModel>({
  name: 'storage',
  defaults: {
    bucket: '',
    query: [],
    data: { total: 0, files: [] },
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
    this.sioStorageService.subscribeEvents().subscribe((event) => {
      this.sioCoreLoggerService.debug(
        `[SioStorageState][ngxAfterBootstrap] received events`,
      );
      this.sioCoreLoggerService.trace(
        `[SioStorageState][ngxAfterBootstrap]`,
        event, 
      );
      console.log(event);
      if (event.payload.bucketId === this.snapshot.bucket) this.query();
    });
  }

  @Computed()
  public get totals(): number | null {
    return this.snapshot.data.total;
  }

  @DataAction()
  public setBucket(value: string) {
    this.patchState({ bucket: value });
  }

  @DataAction()
  public async query(query?: string[], search?: string) {
    try {
      if (query) {
        this.ctx.patchState({ query: query });
      }
      const files: SioStorageFileListInterface | undefined =
        await this.sioStorageService.list(
          this.snapshot.bucket,
          this.snapshot.query,
          search,
        );
      if (files) {
        this.patchState({ data: files });
      }
    } catch (e) {
      this.sioCoreLoggerService.error((e as Error).message);
    }
  }

  @Computed() 
  get data(): SioStorageFileInterface[] {
    return this.snapshot.data.files
  }

  public async remove(scope: string[] | string) {
    try {
      let fileListId: string[] = [];
      if(scope === 'all') {
        this.sioCoreLoggerService.debug('[SioStorageState][remove] delete all files');
        fileListId = fileListId.concat((this.snapshot.data.files.map((file: SioStorageFileInterface) => { return file.$id }))); 
      } else {
        if((typeof scope) === 'string') fileListId.push(scope as string);
      }
      this.sioCoreLoggerService.trace('[SioStorageState][upload] list of Files', fileListId);
      fileListId.forEach((fileId) => { console.log('invio');this.sioStorageService.delete(this.snapshot.bucket, fileId)});
    } catch(e) {
      console.error((e as Error).message);
    }
  }

  @DataAction()
  public async upload(fileList: SioStorageFileInterface[], fileId?: string) {
    try {
      this.sioCoreLoggerService.debug('[SioStorageState][upload] try to upload');
      this.sioCoreLoggerService.trace('[SioStorageState][upload] fileList =',fileList );
      this.sioCoreLoggerService.trace('[SioStorageState][upload] fileId =',fileId );
      if (fileId) {
        this.sioStorageService.upload(
          this.snapshot.bucket,
          fileList[0],
          fileId,
        );
      } else {
        fileList.forEach((data) =>
          this.sioStorageService.upload(this.snapshot.bucket, data),
        );
      }
    } catch (e) {
      console.error((e as Error).message);
    }
  }
}
