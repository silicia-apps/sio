import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { SioCoreLoggerService } from '../../services';
import { SioCorePageComponentState } from './store';
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

  public split : boolean;

  constructor(
    private elementRef: ElementRef, 
    private sioLoggerService: SioCoreLoggerService,
    public sioCoreAppComponentState: SioCoreAppComponentState,
    public sioCorePageComponentState: SioCorePageComponentState,
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
    //this.split$.subscribe((value) => { this.split = value});
  }
}