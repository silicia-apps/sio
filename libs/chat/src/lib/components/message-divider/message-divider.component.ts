import { Component, Input, OnInit } from '@angular/core';
import { IonItemDivider, IonLabel } from '@ionic/angular/standalone';
import { MomentModule } from 'ngx-moment';

@Component({
  selector: 'sio-message-divider',
  templateUrl: './message-divider.component.html',
  styleUrls: ['./message-divider.component.scss'],
  imports: [IonItemDivider, MomentModule],
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

  ngOnInit() {}
}