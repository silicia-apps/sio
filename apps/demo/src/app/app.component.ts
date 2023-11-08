import { Component } from '@angular/core';
import { SioCommonModule, SioCoreLoggerService, Loggable } from '@silicia/core';

@Loggable()
@Component({
  selector: 'sio-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [SioCommonModule],
})
export class AppComponent {
  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
  ) {
    this.sioCoreLoggerService.debug(`[AppComponent][constructor]`);
  }
}
