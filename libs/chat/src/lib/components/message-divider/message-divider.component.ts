import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { IonItemDivider, IonLabel } from '@ionic/angular/standalone';
import { MomentModule } from 'ngx-moment';
import { SioCommonModule } from '@silicia/core';

@Component({
  selector: 'sio-message-divider',
  templateUrl: './message-divider.component.html',
  styleUrls: ['./message-divider.component.scss'],
  imports: [
    CommonModule,
    SioCommonModule,
    // IonItemDivider,
    // IonLabel,
    MomentModule, 
    //NgClass
  ],
  standalone: true,
})
export class SioChatMessageDividerComponent implements OnInit {
  @Input() isPageScrolling = false;
  @Input() createdAt: string = new Date().toDateString();

  amCalendarGroup = {
    sameDay: '[Today]',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD-MM-YYYY',
  };
  constructor() {

  }

  ngOnInit() { }
}