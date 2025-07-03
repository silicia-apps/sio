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
  name: string;
  badge: number;
  dot: boolean;
  tempValue: number;
  temp: string;
}

export interface IconUI {
  color: string;
  slot: string;
  smallicon: string;
  off: string;
  animationDisabled: boolean;
}

export type IconState = (IconData & IconUI);

@Injectable({ providedIn: 'root' })
export class IconComponentStore extends ImmutableStore<IconState> {
  
  public get indicator():Signal<'normal'|'scale'> {
    return computed(() => ( this.state().badge > 0 ? 'scale' : 'normal'));
  }

  constructor() {
    super({
      initialState: { 'badge':0 },
      name: 'IconStore',
      plugins: [
        useDevtools(),
        useDeepFreeze(),
        /*useStorePersistence(
          configureIndexedDb({
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
