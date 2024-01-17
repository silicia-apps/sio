import { EntityIdType } from '@angular-ru/cdk/entity';
import { Computed, DataAction } from '@angular-ru/ngxs/decorators';
import { NgxsDataEntityCollectionsRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { SioDatabaseDocumentInterface } from '../models';
import { SioDatabaseService } from '../services';
import { SioCoreLoggerService } from '@silicia/core';
import { SioDatabaseDocumentListInterface } from '../interfaces';

@Injectable()
export abstract class SioDatabaseState<
  T extends SioDatabaseDocumentInterface,
> extends NgxsDataEntityCollectionsRepository<
  T,
  EntityIdType,
  {
    remoteTotals: number;
    localTotals: number;
    databaseId: string;
    collectionId: string;
    queries: string[];
  }
> {
  public override primaryKey: string = '$id';

  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
    private sioDatabaseService: SioDatabaseService,
  ) {
    super();
  }

  override ngxsAfterBootstrap(): void {
    this.sioDatabaseService.subscribe().subscribe((event) => {
      this.sioCoreLoggerService.debug(
        `[SioStorageState][ngxAfterBootstrap] received events`,
      );
      this.sioCoreLoggerService.trace(
        `[SioStorageState][ngxAfterBootstrap]`,
        event,
      );
      this.load();
    });
  }

  @DataAction()
  setDatabaseId(value: string) {
    if (value) this.patchState({ databaseId: value });
  }

  @DataAction()
  setCollectionId(value: string) {
    if (value) this.patchState({ collectionId: value });
  }

  @DataAction()
  setQueries(value: string[]) {
    if (value) this.patchState({ queries: value });
  }

  @DataAction()
  async load(
    queries?: string[],
    databaseId?: string,
    collectionId?: string,
  ): Promise<boolean> {
    try {
      if (databaseId) this.setDatabaseId(databaseId);
      if (collectionId) this.setCollectionId(collectionId);
      if (queries) this.setQueries(queries);
      if (this.snapshot.databaseId && this.snapshot.collectionId) {
        const documents = <SioDatabaseDocumentListInterface<T>>(
          await this.sioDatabaseService.query(
            this.snapshot.databaseId,
            this.snapshot.collectionId,
            this.snapshot.queries,
          )
        );
        this.setEntitiesMany(documents.documents);
        this.setRemoteTotals(documents.total);
        this.setLocalTotals(this.snapshot.ids.length);
      }
      return true;
    } catch (e) {
      console.error((e as Error).message);
      this.sioCoreLoggerService.error(
        `[SioDatabaseState][load]`,
        (e as Error).message,
      );
      return false;
    }
  }

  @DataAction()
  private setRemoteTotals(value: number) {
    this.patchState({ remoteTotals: value });
  }

  @DataAction()
  private setLocalTotals(value: number) {
    this.patchState({ localTotals: value });
  }

  @Computed()
  get remoteTotals(): number {
    return this.snapshot.remoteTotals;
  }

  override removeByEntity(entity: T): void {
      this.sioDatabaseService.delete(entity.$id!, this.snapshot.collectionId, this.snapshot.databaseId);
  }

  override addOne(entity: T): void {
      //super.addOne(entity);
      this.sioDatabaseService.add(entity, this.snapshot.collectionId, this.snapshot.databaseId);
  }
  
  override setOne(entity: T): void {
    //super.setOne(entity);
    this.sioDatabaseService.set(
      entity.$id as string,
      entity,
      this.snapshot.collectionId,
      this.snapshot.databaseId,
    );
  }

  @Computed()
  get localTotals(): number {
    return this.snapshot.localTotals;
  }
}
