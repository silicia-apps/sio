import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { SioCoreLoggerService } from '../../services';
import {
  SioCorePageComponentInterface,
  SioCorePagesComponentState,
} from './store';
import { SioCoreAppComponentState } from '../app/store';

import { AttributeBoolean } from '@angular-ru/cdk/decorators';
import { InputBoolean } from '@angular-ru/cdk/typings';

import { SioColorType } from '../../types';

@Component({
  selector: 'sio-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class SioCorePageComponent implements OnInit {
  @Input() title: string;
  @Input() color: SioColorType;

  @AttributeBoolean() @Input() set toolbar(value: InputBoolean) {
    if (this.page) {
      this.page.toolbar = value;
    }
  }

  @AttributeBoolean() @Input() set menu(value: InputBoolean) {
    if (this.page) {
      this.page.menu = value;
    }
  }

  @AttributeBoolean() @Input() set back(value: InputBoolean) {
    if (this.page) {
      this.page.back = value;
    }
  }
  @AttributeBoolean() @Input() set search(value: InputBoolean) {
    if (this.page) {
      this.page.search = value;
    }
  }

  @AttributeBoolean() @Input() set fullmode(value: InputBoolean) {
    this.sioCoreAppComponentState.SetFullmode(value as boolean);
  }

  
  public split: boolean;

  constructor(
    private elementRef: ElementRef,
    private sioLoggerService: SioCoreLoggerService,
    public sioCoreAppComponentState: SioCoreAppComponentState,
    public sioCorePagesComponentState: SioCorePagesComponentState,
  ) {
    //this.sioCoreAppComponentState.SetFullmode(false);
    this.toolbar = true;
    this.title = 'PAGE_TITLE';
    this.menu = false;
    this.back = false;
    this.search = false;
    this.split = false;
    this.elementRef.nativeElement.classList.add('ion-page');
    //this.sioCoreAppComponentState.setSidemenu('pricetags');
  }

  //@Select(SioCoreAppComponentState.split) split$!: Observable<boolean>;

  ngOnInit(): void {
    this.sioLoggerService.debug(`[sioCorePageComponentState][ngOnInit]`);
    this.page = this.sioCorePagesComponentState.selectOne('pageId');
    //this.split$.subscribe((value) => { this.split = value});
  }
}
