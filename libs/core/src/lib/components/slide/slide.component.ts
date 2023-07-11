import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { SioCoreLoggerService } from '../../services/logger';

import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'sio-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss'],
})
export class SioCoreSlideComponent implements OnInit {
  public swiperModules = [IonicSlides];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private sioCoreLoggerService: SioCoreLoggerService) {}

  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[SioCoreSlideComponent][OnInit]');
  }

}
