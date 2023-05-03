import { Component, Input, OnInit } from '@angular/core';
import { SioCoreLoggerService } from '../../services';
import { SioCorePageComponentState } from './store';
import { SioCoreAppComponentState } from '../app/store';

import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';

import { SioColorType } from '../../shared/shared.type';

@Component({
  selector: 'sio-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class SioCorePageComponent implements OnInit {
  
  @Input() title: string;
  //@Input() set title(value: string) { this.sioCorePageComponentState.setTitle(value) };
  
  @Input() color: SioColorType;
  @AttributeBoolean() @Input() set toolbar(value: InputBoolean) {
    this.sioCorePageComponentState.setToolbar(value as boolean);
  }
  @AttributeBoolean() @Input() set menu(value: InputBoolean) {
    this.sioCorePageComponentState.setMenu(value as boolean);
  }
  @AttributeBoolean() @Input() set back(value: InputBoolean) {
    this.sioCorePageComponentState.setBack(value as boolean);
  }
  @AttributeBoolean() @Input() set search(value: InputBoolean) {
    this.sioCorePageComponentState.setSearch(value as boolean);
  }

  @AttributeBoolean() @Input() set fullmode(value: InputBoolean) {
    this.sioCoreAppComponentState.SetFullmode(value as boolean);
  }

  constructor(
    private sioLoggerService: SioCoreLoggerService,
    private sioCoreAppComponentState: SioCoreAppComponentState,
    public sioCorePageComponentState: SioCorePageComponentState,
  ) {
    this.toolbar = true;
    this.title = 'T_PAGE';
    this.menu = false;
    this.back = false;
    this.search = false
  }

  ngOnInit(): void {
    this.sioLoggerService.debug(`[sioCorePageComponentState][ngOnInit]`);
  }
}