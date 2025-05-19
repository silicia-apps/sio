import { EntityIdType } from "@angular-ru/cdk/entity";
import { Computed, DataAction } from "@angular-ru/ngxs/decorators";
import { NgxsDataAfterReset, NgxsDataDoCheck } from "@angular-ru/ngxs/typings";
import { NgxsDataEntityCollectionsRepository } from "@angular-ru/ngxs/repositories";
import { Injectable } from "@angular/core";
import { SioDatabaseDocumentInterface } from "../models";
import { SioDatabaseService } from "../services";
import { SioCoreLoggerService } from "@silicia/core";
import { SioDatabaseDocumentListInterface } from "../interfaces";
import { Subscription } from "rxjs";

@Injectable()
export abstract class SioDatabaseState<T extends SioDatabaseDocumentInterface>
  extends NgxsDataEntityCollectionsRepository<
    T,
    EntityIdType,
    {
      remoteTotals: number;
      localTotals: number;
      databaseId: string;
      collectionId: string;
      remoteIndex: string | number;
      queries: string[];
    }
  >
  implements NgxsDataDoCheck, NgxsDataAfterReset
{
  public override primaryKey = "$id";
  private subcriptions: Subscription | undefined;

  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
    private sioDatabaseService: SioDatabaseService
  ) {
    super();
  }

  public ngxsDataDoCheck(): void {
    {
      this.subcriptions = this.sioDatabaseService
        .subscribe()
        .subscribe((event) => {
          this.sioCoreLoggerService.debug(
            `[SioDatabaseState][DataSocket] received events`,
            event
          );
          console.log('Passa ' + event.channels.some(event.events));
          const item = this.selectOne(event.payload.$id);
          if (item) {
            console.debug(
              "[SioDatabaseState][DataSocket] items in list, updated"
            );
            this.setEntityOne(event.payload);
          } else {
            console.debug(
              "[SioDatabaseState][DataSocket] items not in list, add"
            );
          }
          
          this.load();
        });
    }
  }

  public ngxsDataAfterReset(): void {
    this.subcriptions?.unsubscribe();
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
    collectionId?: string
  ): Promise<boolean> {
    try {
      if (databaseId) this.setDatabaseId(databaseId);
      if (collectionId) this.setCollectionId(collectionId);
      if (queries) this.setQueries(queries);
      if (this.snapshot.databaseId && this.snapshot.collectionId) {
        if (this.snapshot.queries) {
          if (this.snapshot.remoteIndex)
            queries = [
              ...this.snapshot.queries,
              this.sioDatabaseService.cursorAfter(this.snapshot.remoteIndex as string),
            ];
        }
        const documents = <SioDatabaseDocumentListInterface<T>>(
          await this.sioDatabaseService.query(
            this.snapshot.databaseId,
            this.snapshot.collectionId,
            queries
          )
        );
        if (this.snapshot.remoteIndex) {
          this.addEntitiesMany(documents.documents);
        } else {
          this.setEntitiesMany(documents.documents);
        }
        this.setRemoteTotals(documents.total);
        this.setLocalTotals(this.snapshot.ids.length);
        this.setRemoteIndex(documents.documents.pop()?.$id as string);
      }
      return true;
    } catch (e) {
      console.error((e as Error).message);
      this.sioCoreLoggerService.error(
        `[SioDatabaseState][load]`,
        (e as Error).message
      );
      return false;
    }
  }

  @DataAction()
  public setRemoteIndex(value: string | number) {
    this.patchState({ remoteIndex: value });
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

  @Computed()
  get queries(): string[] {
    return this.snapshot.queries;
  }

  @Computed()
  get remoteIndex(): string | number {
    return this.snapshot.remoteIndex;
  }

  override removeOne(id: string | number): void {
    this.sioCoreLoggerService.debug("[SioDatabaseState][removeByEntity]", id);
    this.sioDatabaseService.delete(
      id,
      this.snapshot.collectionId,
      this.snapshot.databaseId
    );
    super.removeOne(id);
  }

  override addOne(entity: T): void {
    this.sioCoreLoggerService.debug("[SioDatabaseState][addOne]", entity);
    //super.addOne(entity);
    this.sioDatabaseService.add(
      entity,
      this.snapshot.collectionId,
      this.snapshot.databaseId
    );
  }

  override setOne(entity: T): void {
    this.sioCoreLoggerService.debug("[SioDatabaseState][setOne]", entity);
    //super.setOne(entity);
    this.sioDatabaseService.set(
      entity.$id as string,
      entity,
      this.snapshot.collectionId,
      this.snapshot.databaseId
    );
  }

  @Computed()
  get localTotals(): number {
    return this.snapshot.localTotals;
  }
}
