import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
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
import { IconComponentStore, IconState } from './state/icon.component.store';

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
  public color = input<SioColorType>();
  public slot = input<'start' | 'end' | 'icon-only'>();
  public name = input<string>();
  public url = input<string>();
  public size = input<'small' | 'large'>();
  public only = input<boolean>(false);
  public dot = true;
  public badgeState : any;
  public off = true;
  public state : any;

  public store = inject(IconComponentStore);
  private sioLoggerService = inject(SioCoreLoggerService); 

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    effect(() => {
      this.store.set({
        badge: 0,
        color: this.color(),
        name: this.name(),
        slot: this.slot(),
      },'Store Inputs To State');
    });
    this.sioLoggerService.debug(
      '[SioCoreIconComponent] Create Icon' + this.name,
      this.name,
    );
  }

  incrementDone($event: any) {}
  rotateAnimDone($event: any) {}
}
