import { computed, Injectable, ResourceStreamingLoader, Signal } from '@angular/core';
('@angular/core');
import {
  ImmutableStore,
  Store,
  clearStoreStorage,
  configureIndexedDb,
  useDeepFreeze,
  useDevtools,
  useLogger,
  usePerformanceCounter,
  useStorePersistence,
  useStoreStatus,
} from 'signalstory';

export interface IconData {
  name?: string;
  badge: number;
  dot?: boolean;
  tempValue?: number;
  temp?: string;
  indicatorState?: 'normal' | 'scale';
}

export interface IconUI {
  color?: string;
  slot?: string;
  smallIcon?: string;
  off?: string;
  animationDisabled?: boolean;
}

export type IconState = (IconData & IconUI);

@Injectable({ providedIn: 'root' })
export class IconComponentStore extends ImmutableStore<IconState> {
  constructor() {
    super({
      initialState: { badge:0 },
      name: 'IconStore',
      plugins: [
        useDevtools(),
        useDeepFreeze(),
        /*useStorePersistence(
          /*configureIndexedDb({
            dbName: 'test',
          }),
        ),*/
        useLogger(),
        useStoreStatus(),
        usePerformanceCounter(),
      ],
    });

    //this.registerHandler(storeResetRequestEvent, store => {
    //  store.set(this.getBooksInSearchscope(), 'Reset');
    //  clearStoreStorage(store);
    //});
  }

  // Expose functions to query the state
  
}
