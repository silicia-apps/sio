/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, Input, Optional } from '@angular/core';

import { NgControl } from '@angular/forms';
import { SioCoreFormComponentState } from '../form/store/form.state';

@Component({
  selector: 'sio-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class SioCoreInputComponent implements OnInit {
  private pValue: string | number | undefined;
  public _type:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
    | undefined;
  private _name = '';
  private _label = '';

  @Input() set label(value: string | null | undefined) {
    this._label = <string>value;
  }

  get label(): string {
    return this._label;
  }

  @Input() public set name(value: string) {
    if (!this.label) {
      this._label = `auth.L_${value?.toUpperCase()}`;
    }
    this._name = value;
  }

  get name(): string {
    return this._name;
  }

  @Input() public position: 'stacked' | 'fixed' | 'floating' = 'floating';
  @Input() public autocapitalize: 'on' | 'off' = 'off';
  @Input() public autocomplete: 'on' | 'off' = 'off';
  @Input() public autocorrect: 'on' | 'off' = 'off';
  @Input() public autofocus = false;
  @Input() public clearInput = false;
  @Input() public clearOnEdit: boolean | undefined = undefined;
  @Input() public color: string | undefined = undefined;
  @Input() public debounce = 0;
  @Input() public disabled = false;
  @Input() public lines: 'full' | 'inset' | 'none' = 'full';
  @Input() public inputMode:
    | 'decimal'
    | 'email'
    | 'none'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | undefined;

  public get invalid(): boolean {
    return this.control ? <boolean>this.control.invalid : false;
  }

  public get dirty(): boolean {
    return this.control ? <boolean>this.control.dirty : false;
  }

  public get error(): unknown {
    return this.control.errors;
  }

  @Input()
  public set type(
    value:
      | 'date'
      | 'datetime-local'
      | 'email'
      | 'month'
      | 'number'
      | 'password'
      | 'search'
      | 'tel'
      | 'text'
      | 'time'
      | 'url'
      | 'week'
      | undefined
  ) {
    if (!this.inputMode) {
      switch (value) {
        case 'number':
          this.inputMode = 'numeric';
          break;
        case 'email':
          this.inputMode = 'email';
          break;
        case 'tel':
          this.inputMode = 'tel';
          break;
        case 'search':
          this.inputMode = 'search';
          break;
        case 'url':
          this.inputMode = 'url';
          break;
        case 'text':
        case 'password':
          this.inputMode = 'text';
          break;
        default:
          this.inputMode = 'none';
      }
    }
    this._type = value;
  }

  get valueInput(): string | number {
    return <string>this.pValue;
  }

  set valueInput(newValue: string | number) {
    if (newValue !== this.pValue) {
      this.pValue = newValue;
      if (this.onChangeCallback) {
        this.onChangeCallback(this.pValue);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private onTouchedCallback: (() => {}) | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onChangeCallback = (_: any) => {};

  constructor(
    public SioCoreFormComponentState: SioCoreFormComponentState,
    @Optional() private control: NgControl
  ) {
    this.label = 'LABEL_';
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}

  writeValue(newVal: any): void {
    if (newVal !== undefined && newVal !== this.pValue) {
      this.pValue = newVal;
    }
  }

  blur() {
    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
}