import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SioCoreLoggerService } from '../../services/logger';
import { SioColorType } from '../../types';

@Component({
  selector: 'sio-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class SioCoreMenuItemComponent implements OnInit {
  @Input() public caption: string | undefined = undefined;
  @Input() public style: 'default' | 'rounded' | 'custom' | 'tab' = 'rounded';
  @Input() public lines: 'full' | 'inset' | 'none' = 'none';
  @Input() public color: SioColorType = 'none';
  @Input() public icon: string | undefined = undefined;
  @Input() public url: string | undefined = undefined;
  @Input() public layout:
    | 'icon-bottom'
    | 'icon-end'
    | 'icon-hide'
    | 'icon-start'
    | 'icon-top'
    | 'label-hide'
    | undefined = undefined;
  @Input() public type: 'download' | 'navigate' | 'external' | 'custom' =
    'navigate';
  @Input() public badge: number | undefined = undefined;
  @Input() public tabbed = false;

  @Output() sioCoreMenuItemClick = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private sioCoreLoggerService: SioCoreLoggerService) {
    this.sioCoreLoggerService.debug('[SioCoreMenuItem][constructor] add menu item' + this.caption);
  }

  ngOnInit(): void {
    if (this.type !== 'custom')
      if (!this.url) {
        this.url = '/';
      } else {
        if (this.url.startsWith('http://') || this.url.startsWith('https://')) {
          this.sioCoreLoggerService.debug('external url');
          this.type = 'external';
          if (!this.caption)
            this.caption = `M_LINK_${this.url
              .replace('http://', '')
              .replace('https://', '')
              .replace('www.', '')
              .split('.')[0]
              .toUpperCase()}`;
        } else {
          this.sioCoreLoggerService.debug('internal url');
          this.type = 'navigate';
          this.url =
            (!this.url.replace('//', '/').startsWith('/') ? '/' : '') +
            this.url;
          if (!this.caption)
            this.caption = `M${this.url.replace('/', '_').toUpperCase()}`;
        }
      }
  }

  public async Click(): Promise<void> {
    this.sioCoreLoggerService.info(
      '[SioCoreMenuItemComponent][Click] raise event click'
    );
    switch (this.type) {
      case 'external':
        window.open(this.url as string, '_blank');
        break;
      case 'navigate':
      default:
    }
    this.sioCoreMenuItemClick.emit();
  }
}
