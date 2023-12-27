import { Component, EnvironmentInjector } from '@angular/core';
import { SioAuthModule } from '@silicia/auth';
import { SioCommonModule, SioCoreLoggerService, Loggable } from '@silicia/core';

@Loggable()
@Component({
  selector: 'sio-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [ SioCommonModule, SioAuthModule ],
})
export class AppComponent {
  constructor(
    public environmentInjector: EnvironmentInjector,
    private sioCoreLoggerService: SioCoreLoggerService,
  ) {
    this.sioCoreLoggerService.debug(`[AppComponent][constructor]`);
  }
}
