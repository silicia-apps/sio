import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { IonToggle } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Loggable, SioCoreLoggerService } from '../../services';
import { SioColorType } from '../../types';
import { SioCoreAppComponentState } from '../../store';

@Loggable()
@Component({
    selector: 'sio-darkmode-toggle',
    templateUrl: './darkmode-toggle.component.html',
    styleUrls: ['./darkmode-toggle.component.scss'],
    standalone: false
})
export class SioCoreDarkModeToggleComponent implements OnInit {
  @Input() public caption = 'L_DARKMODE';
  @Input() public style: 'default' | undefined = undefined;
  @Input() public color: SioColorType;
  @Input() public icon = 'sunny';

  public label = 'L_DARKMODE';

  darkmode$: Observable<boolean | undefined> =  inject(Store).select(SioCoreAppComponentState.darkmode);; 

  @ViewChild('darkmode_toggle', { static: true }) ionToggle!: IonToggle;

  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
    public sioCoreAppComponentState: SioCoreAppComponentState
  ) {}

  ngOnInit(): void {
    this.darkmode$.subscribe((value) => {
      document.body.classList.toggle('dark', value);
      this.ionToggle.checked = value || false;
      this.label = this.caption + ((value)?'_ON':'_OFF');   
      this.icon = (value)?'moon':'sunny'; 
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onChange(event: any) {
    this.sioCoreLoggerService.debug('[SioCoreDarkModeToggleComponent][onChange] - Switch style');
    if (event.detail.checked) {
      this.sioCoreLoggerService.debug('[SioCoreDarkModeToggleComponent][onChange] - New Style is Dark Mode');
      this.sioCoreAppComponentState.setDark(true);
    } else {
      this.sioCoreLoggerService.debug('[SioCoreDarkModeToggleComponent][onChange] - New Style is Light Mode');
      this.sioCoreAppComponentState.setDark(false);
    }
  }
}
