import { Component } from '@angular/core';
import { SioCommonModule } from '@silicia/core';


@Component({
    selector: 'sio-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    imports: [SioCommonModule]
})
export class HomePageComponent {
  constructor(
    
  ) {
   this.sioCoreLoggerService.debug('[HomePageComponent][constructor]');
    
  }

 
  
}
