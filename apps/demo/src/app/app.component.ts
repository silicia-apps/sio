import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SioCommonModule, SioCoreModule } from '@sio/core';

@Component({
  selector: 'sio-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [SioCommonModule],
})
export class AppComponent {
  constructor() {
    console.log('test');
  }
}
