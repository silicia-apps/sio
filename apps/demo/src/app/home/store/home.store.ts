import { Injectable } from '@angular/core';
import { StateToken } from '@ngxs/store';

import { State } from '@ngxs/store';
//import { TranslateService } from '@ngx-translate/core';
import {
  Computed,
  DataAction,
  StateRepository,
} from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { SioDatabasePluginService } from '@silicia/database';
import {
  SioCoreDocumentInterface,
  SioCoreDocumentsInterface,
  SioCoreLoggerService,
} from '@silicia/core';
import { Query } from 'appwrite';

export interface SiliciaHomePageStateModel {
  customers: number;
  invoices: { number: number; totals: number };
  agents: number;
  notifications: { number: number; totals: number };
}

const HOME_PAGE_STATE_TOKEN = new StateToken<SiliciaHomePageStateModel>('homepage');

@StateRepository()
@State<SiliciaHomePageStateModel>({
  name: HOME_PAGE_STATE_TOKEN,
  defaults: {
    customers: 0,
    agents: 0,
    invoices: { number: 0, totals: 0 },
    notifications: { number: 0, totals: 0 },
  } as SiliciaHomePageStateModel,
})
@Injectable()
export class SiliciaHomePageState extends NgxsDataRepository<SiliciaHomePageStateModel> {
  constructor(
    //private translateService: TranslateService,
    private sioCoreLoggerService: SioCoreLoggerService,
    private sioDatabasePluginService: SioDatabasePluginService,
  ) {
    super();
  }

  override async ngxsAfterBootstrap(): Promise<void> {
    try {
      this.sioCoreLoggerService.debug(
        `[SiliciaHomePageState][ngxsAfterBootstrap] Start`,
      );
      this.sioCoreLoggerService.debug(
        `[SiliciaHomePageState][ngxsAfterBootstrap] Connect to Backoffice for get customers`,
      );
      const nCustomers:
        | SioCoreDocumentsInterface<SioCoreDocumentInterface>
        | boolean = await this.sioDatabasePluginService.List(
        '6558932d3c15f9c61acf',
        [Query.limit(1)],
        '6544ff00d56aaccc488d',
      );
      this.sioCoreLoggerService.debug(
        `[SiliciaHomePageState][ngxsAfterBootstrap] Connect to Backoffice for get agents`,
      );
      const nAgents:
        | SioCoreDocumentsInterface<SioCoreDocumentInterface>
        | boolean = await this.sioDatabasePluginService.List(
        '65686484855932153c13',
        [Query.limit(1)],
        '6544ff00d56aaccc488d',
      );
      this.sioCoreLoggerService.debug(
        `[SiliciaHomePageState][ngxsAfterBootstrap] Connect to Backoffice for get invoices`,
      );
      const invoices:
        | SioCoreDocumentsInterface<SioCoreDocumentInterface>
        | boolean = await this.sioDatabasePluginService.List(
        '65589336c4657fc63b5c',
        [Query.limit(1)],
        '6544ff00d56aaccc488d',
      );
      this.sioCoreLoggerService.debug(
        `[SiliciaHomePageState][ngxsAfterBootstrap] Connect to Backoffice for get notifications`,
      );
      const notifications:
        | SioCoreDocumentsInterface<SioCoreDocumentInterface>
        | boolean = await this.sioDatabasePluginService.List(
        '6558979a05e531713b1d',
        [Query.limit(1)],
        '6544ff00d56aaccc488d',
      );
      this.sioCoreLoggerService.debug(
        `[SiliciaHomePageState][ngxsAfterBootstrap] Connect to Backoffice for get notifications`,
      );
      const state:
        | SioCoreDocumentsInterface<SioCoreDocumentInterface>
        | boolean = await this.sioDatabasePluginService.List(
        '656e5a8f2dec24f0cc50',
        [Query.limit(1)],
        '6544ff00d56aaccc488d',
      );

      const new_state = {
        customers: nCustomers.total,
        agents: nAgents.total,
        invoices: { number: invoices.total, totals: state.documents[0]['totals'] },
        notifications: { number: notifications.total, totals: state.documents[0]['totals'] },
      } as SiliciaHomePageStateModel;
      this.loadData(new_state);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.sioDatabasePluginService.socket('*').subscribe( (test: string[]) => {
        console.log('pippo');
      })
    } catch (e: unknown) {
      this.sioCoreLoggerService.error('errore',e);
    }
  }

  @Computed()
  get customers(): number {
    return this.snapshot.customers || 0;
  }

  @Computed()
  get agents(): number {
    return this.snapshot.agents || 0;
  }

  @Computed()
  get invoices(): { number: number, totals: number} {
    return this.snapshot.invoices || 0;
  }

  @Computed()
  get notifications(): { number: number, totals: number} {
    return this.snapshot.notifications || 0;
  }

  @DataAction()
  loadData(value: SiliciaHomePageStateModel) {
    this.ctx.patchState(value);
  }
}
