import { Component, Input, OnInit } from '@angular/core';
import { SioCoreLoggerService } from '../../services';

@Component({
  selector: 'sio-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class SioCoreTitleComponent implements OnInit {
  
  @Input() title: string;
  
  constructor(
    private sioLoggerService: SioCoreLoggerService,
  ) {
    this.title = 'T_PAGE';
  }

  ngOnInit(): void {
    this.sioLoggerService.debug(`[sioCoreTitleComponent][ngOnInit]`);
  }
}