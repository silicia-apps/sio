import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { SioCoreLoggerService } from '@silicia/core';
import { SioDatabaseState } from '../store';
import { SioDatabaseDocumentInterface } from '../models';
import { SioDatabaseDocumentListInterface } from '../interfaces';

@Directive({
  selector: '[sioData]',
})
export class SioListDataDirective<T extends SioDatabaseDocumentInterface> {
  constructor(private sioCoreLoggerService: SioCoreLoggerService) {
    this.sioCoreLoggerService.debug('[Directive][SioData][constructor]');
    this.avatar = 'avatar';
  }
  @Input() public sioData: SioDatabaseState<T> | undefined = undefined;

  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  @HostBinding('attr.avatar') avatar: string;

  @HostListener('sioCoreListItemLeftSwipe')
  onSioCoreListItemLeftSwipe(id: Record<string, number | string>) {
    this.sioCoreLoggerService.debug(
      '[Directive][SioData][onSioCoreListItemLeftSwipe]',id
    );
  }
  @HostListener('sioCoreListItemRightSwipe',['$event.id'])
  onSioCoreListItemRightSwipe(id: Record<string, number | string>) {
    this.sioCoreLoggerService.debug(
      '[Directive][SioData][onSioCoreListItemRightSwipe]',id
    );
  }
}
