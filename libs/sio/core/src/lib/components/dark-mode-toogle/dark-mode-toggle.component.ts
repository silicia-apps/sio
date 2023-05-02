import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonToggle } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Loggable, SioCoreLoggerService } from '../../services';
import { SioColorType } from '../../shared/shared.type';
import { SioCoreAppComponentState } from '../../store';

@Loggable()
@Component({
  selector: 'sio-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss'],
})
export class SioCoreDarkModeToggleComponent implements OnInit {
  @Input() public caption = 'L_DARKMODE';
  @Input() public style: 'default' | undefined = undefined;
  @Input() public color: SioColorType;
  @Input() public icon = 'sunny';

  public label = 'L_DARKMODE';

  @Select(SioCoreAppComponentState.darkmode) darkmode$!: Observable<boolean>;

  @ViewChild('darkmode_toggle', { static: true }) ionToggle!: IonToggle;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
    public sioCoreAppComponentState: SioCoreAppComponentState
  ) {}

  ngOnInit(): void {
    this.darkmode$.subscribe((value) => {
      document.body.classList.toggle('dark', value);
      this.ionToggle.checked = value;
      this.label = this.caption + ((value)?'_ON':'_OFF');   
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onChange(event: any) {
    this.sioCoreLoggerService.debug('[SioCoreDarkModeToggleComponent][onChange] - Switch style');
    if (event.detail.checked) {
      this.sioCoreLoggerService.debug('[SioCoreDarkModeToggleComponent][onChange] - New Style is Dark Mode');
      this.sioCoreAppComponentState.setDark(true);
      this.icon = 'moon';
    } else {
      this.sioCoreLoggerService.debug('[SioCoreDarkModeToggleComponent][onChange] - New Style is Light Mode');
      this.sioCoreAppComponentState.setDark(false);
      this.icon = 'sunny';
    }
  }
}
