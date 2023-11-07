import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Loggable, SioCoreLoggerService } from '../../services/logger';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SioCoreFormComponentState } from './store/form.state';
import { SioColorType } from '../../types';

@Loggable()
@Component({
  selector: 'sio-form',
  templateUrl: './form.component.html',
})
export class SioCoreFormComponent implements OnInit {
  @Input() public cancel = false;
  @Input() public state!: SioCoreFormComponentState;
  @Input() public color: SioColorType = 'dark';

  @Output() send = new EventEmitter();

  public form!: UntypedFormGroup;

  constructor(private sioCoreLoggerService: SioCoreLoggerService) {}

  ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const group: any = {};
    if (this.state.layout) {
      this.state.layout.forEach((field:any) => {
        const validator = [];
        if (field.required) validator.push(Validators.required);
        if (field.type === 'email') validator.push(Validators.email); //SioEmailValidator);
        if (field.type === 'tel')
          validator.push(Validators.pattern('^[0-9]+$'));
        group[field.name] = new UntypedFormControl(field.value, validator);
      });
      this.form = new UntypedFormGroup(group);
    }
  }

  public async onSubmit() {
    this.sioCoreLoggerService.info(
      '[SioCoreFormComponent][onSubmit] - form submitted'
    );
    this.send.emit();
  }
}
