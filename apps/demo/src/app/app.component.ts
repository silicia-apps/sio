import { Component } from '@angular/core';
import { SioCommonModule } from '@silicia/core';

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
