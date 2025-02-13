import { Component, Input, OnInit } from '@angular/core';
import { SioCoreLoggerService } from '../../services';
import { SioCoreAppComponentState } from '../app/store';

import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';

import { SioColorType } from '../../types';

@Component({
    selector: 'sio-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class SioCoreHeaderComponent implements OnInit {
  
  @Input() title: string;
  //@Input() set title(value: string) { this.sioCorePageComponentState.setTitle(value) };
  @Input() color: SioColorType;
  @AttributeBoolean() @Input() toolbar : InputBoolean;
  @AttributeBoolean() @Input() menu: InputBoolean;
  @AttributeBoolean() @Input() back: InputBoolean;
  @AttributeBoolean() @Input() search: InputBoolean
  @AttributeBoolean() @Input() fullmode: InputBoolean;

  constructor(
    private sioLoggerService: SioCoreLoggerService,
    private sioCoreAppComponentState: SioCoreAppComponentState,
  ) {
    this.toolbar = true;
    this.title = 'T_PAGE';
    this.menu = false;
    this.back = false;
    this.search = false
  }

  ngOnInit(): void {
    this.sioLoggerService.debug(`[sioCoreHeaderComponent][ngOnInit]`);
  }
}