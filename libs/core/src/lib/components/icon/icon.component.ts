import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  importProvidersFrom,
  inject,
  input,
  Signal,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SioColorType } from '../../types';
import { IonIcon } from '@ionic/angular/standalone';
import { SioCoreLoggerService } from '../../services/logger';
import {
  trigger,
  transition,
  animate,
  state,
  style,
} from '@angular/animations';

@Component({
  selector: 'sio-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  providers: [SioCoreLoggerService, provideAnimations()],
  imports: [IonIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('rotateAnim', [
      transition('normal => rotate', [animate('125ms ease-out')]),
      transition('rotate => normal', [animate('125ms ease-in')]),
      state(
        'rotate',
        style({ opacity: '0', transform: 'scale(0) rotateZ(45deg)' }),
      ),
      state(
        'normal',
        style({ opacity: '1', transform: 'scale(1) rotateZ(0deg)' }),
      ),
    ]),
    trigger('scaleAnim', [
      transition('void => normal', [
        style({ opacity: '0', transform: 'scale(0)' }),
        animate(
          '125ms ease-out',
          style({ opacity: '1', transform: 'scale(1)' }),
        ),
      ]),
      transition('normal => scale', [animate('125ms ease-out')]),
      transition('scale => normal', [animate('125ms ease-in')]),
      state('scale', style({ opacity: '0', transform: 'scale(0)' })),
      state('normal', style({ opacity: '1', transform: 'scale(1)' })),
    ]),
  ],
  standalone: true,
})
export class SioCoreIconComponent {
  private sioLoggerService = inject(SioCoreLoggerService);

  public color = input<SioColorType>();
  public slot = input<'start' | 'end' | 'icon-only'>();
  public name = input<string>();
  public url = input<string>();
  public size = input<'small' | 'large'>();
  public only = input<boolean>(false);
  public dot = input<boolean>(false);
  public badge = input<number>(0);
  public off = true;
  public smallIcon = input<boolean>(false);

  public state = computed(() => {
    return 'rotate';
  });

  public temp = computed(() => {
    return this.name();
  });

  public badgeState = computed(() => {
    if (this.badge()  === 0) {
      return 'scale';
    }
    if (this.badgeState() === 'scale') {
      return 'normal';
    } else {
      return 'scale';
    };
  });

  public indicatorState = computed(() => {
    if (this.dot()) {
      return 'normal';
    } else {
      return 'scale';
    }
  });

  public tempValue: Signal<number> = computed(() => {
    if (this.badgeState() === 'scale') {
      return this.badge();
    } else { return this.tempValue();}
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    this.sioLoggerService.debug(
      '[SioCoreIconComponent] Create Icon' + this.name,
      this.name,
    );
  }


rotateAnimDone($event:any) {}
incrementDone(event:any) {}


 /*rotateAnimDone(event) {
    if (event.fromState === 'normal' && event.toState === 'rotate') {
      this.name = this.temp;
      this.state = 'normal';
    }

    if (event.fromState === 'rotate' && event.toState === 'normal') {
      this.transitionDone.emit(this._name);
    }
  }

  incrementDone(event) {
    if (event.fromState === 'normal' && event.toState === 'scale') {
      if (this.tempValue > 0) {
        this.badgeState = 'normal';
        this._badge = this.tempValue;
      } else {
        this._badge = this.tempValue;
      }
    }
  }*/
}
