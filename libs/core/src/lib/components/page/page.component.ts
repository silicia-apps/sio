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
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'sio-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    // eslint-disable-next-line @angular-eslint/prefer-standalone
    standalone: false
})
export class SioCorePageComponent implements OnInit {
  @Input() color: SioColorType;
  @Input() id: string | undefined;

  public page: SioCorePageComponentInterface | null = null;

  @Input() set title(value: string) {
    this.sioLoggerService.debug(`[sioCorePageComponentState][set title]`, value, this.id);
    this.sioCorePagesComponentState.updateOne({
      id: this.id as string,
      changes: { title: value },
    });
  }

  get title(): string | undefined {
    return this.sioCorePagesComponentState.selectOne(this.page?.id as string)
      ?.title;
  }

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
    private modalCtrl: ModalController
  ) {
    this.toolbar = true;
    if (this.id) {
      this.title = this.id;
    }
    this.menu = false;
    this.back = false;
    this.search = false;
    this.split = false;
    this.elementRef.nativeElement.classList.add('ion-page');
    this.ngOnInit();
    //this.sioCoreAppComponentState.setSidemenu('pricetags');
  }

  //@Select(SioCoreAppComponentState.split) split$!: Observable<boolean>;

  ngOnInit(): void {
    this.sioLoggerService.debug(`[sioCorePageComponentState][ngOnInit]`);
    if (this.id) this.page = this.sioCorePagesComponentState.selectOne(this.id);
    if (!this.page) {
      this.sioLoggerService.debug(`[sioCorePageComponentState][ngOnInit] page ${this.page} not found in store`);
      this.page = {
        id: this.id as string,
        title: this.title,
        color: this.color,
        toolbar: this.toolbar,
        menu: this.menu,
        back: this.back,
        search: this.search,
      };
      this.sioCorePagesComponentState.addOne(
        this.page as SioCorePageComponentInterface,
      );
    }
    // this.split$.subscribe((value) => { this.split = value});
  }

  
}
