import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SioCoreAppComponentState } from './store/app.state';

import { it } from '../../../i18n/it';
import { en } from '../../../i18n/en';

//import { E_SIDEMENU } from '../menu/menu.enum';
import { Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { Platform, IonRouterOutlet } from '@ionic/angular';
import { App } from '@capacitor/app';
import {
  SioCoreEnvironmentService,
  SioCoreLoadingService,
  SioCoreAlertService,
  SioCoreLoggerService,
} from '../../services';
import { SioColorType } from '../../shared/shared.type';

// import { E_APPSTYLE } from './app.enum';
//import { sioCoreMenuInterface } from '../menu/menu.interface';

@Component({
  selector: 'sio-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class SioCoreAppComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  @Input()
  set title(value: string) {
    this.sioCoreAppComponentState.SetTitle(value);
  }

  @Input() menu: string | undefined = undefined;
  @Input() tab: string | undefined = undefined;

  @Input()
  set sidemenu(
    value: 'overlay' | 'reveal' | 'push' | 'toogle' | 'tab' | 'none',
  ) {
    this.sioCoreLoggerService.debug(
      `[sioCoreAppComponent][sidemenu] set sidemenu to ${value}`,
    );
    this.sioCoreAppComponentState.setSidemenu(value);
  }

  @Input() color: SioColorType;

  @Select(SioCoreAppComponentState.loading)
  loading$!: Observable<{ show: boolean; message: string }>;

  @Select(SioCoreAppComponentState.error)

  // eslint-disable-next-line @typescript-eslint/ban-types
  error$!: Observable<{ name: string; message: string; action: Function }>;
  @ViewChild(IonRouterOutlet, { static: true })
  ionRouterOutlet!: IonRouterOutlet;

  public position: 'side' | 'bottom' | 'top' = 'bottom';

  constructor(
    public sioCoreAppComponentState: SioCoreAppComponentState,
    private platform: Platform,
    private sioCoreLoadingService: SioCoreLoadingService,
    private sioCoreAlertService: SioCoreAlertService,
    private sioCoreEnvironmentService: SioCoreEnvironmentService,
    private sioCoreLoggerService: SioCoreLoggerService,
    private translateService: TranslateService,
  ) {
    if (this.sioCoreEnvironmentService.config) {
      this.sioCoreAppComponentState.LoadConfig(
        this.sioCoreEnvironmentService.config.app,
      );
    } else {
      this.sioCoreLoggerService.warn(
        '[sioCoreAppComponent][Constructor] No config in environment file',
      );
    }
    //this.translateService.setTranslation('it', it, true);
    //this.translateService.setTranslation('en', en, true);
  }

  //@Select(SioCoreAppComponentState.split)
  //split$!: Observable<boolean>;

  ngOnInit(): void {
    (async () => {
      this.sioCoreLoggerService.info('await for platform avaible...');
      let platform = await this.platform.ready();

      this.translateService.setTranslation('it', it, true);
      this.translateService.setTranslation('en', en, true);

      //this.translateService.addLangs(this.sioCoreEnvironmentService.config.app.language.avaibles);
      this.translateService.use(
        this.sioCoreEnvironmentService.config.app.language.default,
      );
      this.sioCoreLoggerService.info('Check platform...');
      switch (platform) {
        case 'dom':
          platform = 'browser';
          // eslint-disable-next-line no-case-declarations
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
          this.sioCoreAppComponentState.setDark(prefersDark.matches);
          prefersDark.addEventListener('change', (mediaQuery) =>
            this.sioCoreAppComponentState.setDark(mediaQuery.matches),
          );
          break;
        case 'hybrid':
        case 'cordova':
          this.platform.backButton.subscribeWithPriority(-1, () => {
            if (!this.ionRouterOutlet.canGoBack()) {
              App.exitApp();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.platform.keyboardDidShow.subscribe((ev: any) => {
              const { keyboardHeight } = ev;
              this.sioCoreLoggerService.debug(
                '[sioCoreAppComponent][ngOnInit] raise keyboardDidShow event',
                keyboardHeight,
              );
              // Do something with the keyboard height such as translating an input above the keyboard.
            });

            this.platform.keyboardDidHide.subscribe(() => {
              this.sioCoreLoggerService.debug(
                '[sioCoreAppComponent][ngOnInit] raise keyboardDidHide event',
              );
              // Move input back to original location
            });
          });
          break;
        default:
          this.sioCoreAppComponentState.throwError(
            'sio',
            'UNKNOW_PLATFORM : ' + platform,
          );
      }
      this.sioCoreLoggerService.debug(
        `[sioCoreAppComponent][ngOnInit] - Platform ${platform} detected`,
      );
      await this.sioCoreLoadingService.create();
      this.platform.pause.subscribe(async () => {
        this.sioCoreLoggerService.debug(
          '[sioCoreAppComponent][ngOnInit] - Pause event detected',
        );
      });
      this.platform.resize.subscribe(async () => {
        this.sioCoreLoggerService.debug(
          '[sioCoreAppComponent][ngOnInit] - Resize event detected',
        );
      });
      this.platform.resume.subscribe(async () => {
        this.sioCoreLoggerService.debug(
          '[sioCoreAppComponent][ngOnInit] - Resume event detected',
        );
      });
      this.sioCoreLoggerService.debug(
        '[sioCoreAppComponent][ngOnInit] - Subscribe for Errors',
      );
      this.error$.subscribe(async (value) => {
        if (value && value.message) {
          const alert: unknown = await this.sioCoreAlertService.show(
            value.name,
            value.message,
            value.action,
          );
          this.sioCoreLoggerService.debug(
            '[sioCoreAppComponent][ngOnInit] - Show Alert',
            alert,
          );
        }
      });
      this.sioCoreLoggerService.debug(
        '[sioCoreAppComponent][ngOnInit] - Subscribe for Loader',
      );
      this.loading$.subscribe((value) => {
        if (value.show) this.sioCoreLoadingService.show(value.message);
        else this.sioCoreLoadingService.hide();
      });
      this.sioCoreLoggerService.debug(
        '[sioCoreAppComponent][ngOnInit] - Platform Ready',
        this.platform,
      );
    })();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sioAppSplitPanelVisible(e: any) {
    this.sioCoreLoggerService.debug(
      '[sioAppCoreComponent][sioAppSPlitPanleVisible] - Split Panel State Changed',
      e.detail.visible,
    );
    this.sioCoreAppComponentState.setSplit(e.detail.visible);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
