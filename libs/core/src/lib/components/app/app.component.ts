import { Component, Input, OnDestroy, OnInit, ViewChild, EnvironmentInjector } from '@angular/core';
import { SioCoreAppComponentState } from '../../store/index';

import { it } from '../../../i18n/it';
import { en } from '../../../i18n/en';

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

import type { SioColorType, SioSideMenuType } from '../../types';

@Component({
  selector: 'sio-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class SioCoreAppComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  /**
   * The App Title
   */
  @Input()
  set title(value: string) {
    this.sioCoreAppComponentState.SetTitle(value);
  }

  /**
   * Specifies the behavior of the left sidebar
   */
  @Input()
  set leftPanelType(value: SioSideMenuType) {
    this.sioCoreAppComponentState.setLeftPanelType(value);
  }

  /**
   * Specifies the behavior of the Right sidebar
   */
  @Input()
  set rightPanelType(value: SioSideMenuType) {
    this.sioCoreAppComponentState.setRightPanelType(value);
  }

  /**
   * menu id code to use in the left sidebar. will be displayed as the default component if no content is inserted into the left_content slot
   */
  @Input()
  set leftPanelMenuID(value: string) {
    this.sioCoreAppComponentState.setLeftMenuID(value);
  }

  /**
   * menu id code to use in the right sidebar. will be displayed as the default component if no content is inserted into the right_content slot
   */
  @Input()
  set rightPanelMenuID(value: string) {
    this.sioCoreAppComponentState.setRightMenuID(value);
  }

  /**
   * menu id code to use in the tabbar.
   */
  @Input()
  set tabMenuID(value: string) {
    this.sioCoreAppComponentState.setTabMenuID(value);
  }

  @Input()
  environmentInjector : EnvironmentInjector | undefined;

  /**
   * How display tabbar in desktop mode
   */
  @Input()
  set tabDesktopPosition(value: string) {
    this.sioCoreAppComponentState.setTabDesktop(value);
  }

  /**
   * How display tabbar in mobile mode
   */
  @Input()
  set tabMobilePosition(value: string) {
    this.sioCoreAppComponentState.setTabMobile(value);
  }

  @Input() color: SioColorType;

  @Select(SioCoreAppComponentState.loading)
  loading$!: Observable<{ show: boolean; message: string }>;

  @Select(SioCoreAppComponentState.error)

  // eslint-disable-next-line @typescript-eslint/ban-types
  error$!: Observable<{ name: string; message: string; action: Function }>;
  @ViewChild(IonRouterOutlet, { static: true })
  ionRouterOutlet!: IonRouterOutlet;

  constructor(
    public sioCoreAppComponentState: SioCoreAppComponentState,
    private platform: Platform,
    private sioCoreLoadingService: SioCoreLoadingService,
    private sioCoreAlertService: SioCoreAlertService,
    private sioCoreEnvironmentService: SioCoreEnvironmentService,
    private sioCoreLoggerService: SioCoreLoggerService,
    private translateService: TranslateService,
  ) {
    this.sioCoreLoggerService.info(
      `[sioCoreAppComponentState][constructor] Check config...`,
    );
    if (this.sioCoreEnvironmentService.config) {
      this.sioCoreLoggerService.info(
        `[sioCoreAppComponentState][constructor] Config found loading...`,
        this.sioCoreEnvironmentService.config,
      );
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

      this.translateService.addLangs(
        this.sioCoreEnvironmentService.config.app.language?.avaibles || [],
      );
      this.translateService.use(
        this.sioCoreEnvironmentService.config.app.language?.default || 'en',
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
