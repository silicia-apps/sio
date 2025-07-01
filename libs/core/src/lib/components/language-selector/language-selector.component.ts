import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Loggable, SioCoreLoggerService } from '../../services';
import { SioColorType } from '../../types';
import { SioCoreAppComponentState } from '../../store';
import { TranslateService } from '@ngx-translate/core';

@Loggable()
@Component({
    selector: 'sio-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss'],
    standalone: false
})
export class SioCoreLanguageSelectorComponent implements OnInit {
  @Input() public caption = 'L_LANGUAGE';
  @Input() public style: 'default' | undefined = undefined;
  @Input() public color: SioColorType;
  @Input() public icon = 'sunny';

  public label = 'L_LANGUAGE';

  //@Select(SioCoreAppComponentState) darkmode$!: Observable<boolean>; 

  //@ViewChild('darkmode_toggle', { static: true }) ionToggle!: IonToggle;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
    public sioCoreAppComponentState: SioCoreAppComponentState,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    null;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onChange(event: any) {
    this.sioCoreLoggerService.debug('set language to ' + event.detail.value);
    this.translateService.use(event.detail.value);   
  }
}
