import { Component } from '@angular/core';
import { SioCommonModule, SioCoreLoggerService } from '@silicia/core';


@Component({
    selector: 'sio-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    imports: [SioCommonModule]
})
export class HomePageComponent {
  constructor(
    private sioCoreLoggerService: SioCoreLoggerService
  ) {
   this.sioCoreLoggerService.debug('[HomePageComponent][constructor]');
    
  }
}
