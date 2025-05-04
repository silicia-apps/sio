import { Component, OnInit, Input, EventEmitter, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { SioCoreLoggerService } from '../../services/logger';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal } from '@ionic/angular';

@Component({
    selector: 'sio-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: false
})
export class SioCoreModalComponent implements OnInit {

  @ViewChild(IonModal) modal!: IonModal; 

  @Input() public id = 'main';

  @Output() public willDismiss = new EventEmitter();
  
  onCancel() {
    this.sioCoreLoggerService.info('[SioCoreModalComponent][onCancel]')
    this.modal.dismiss(null, 'cancel');
  }

  onSubmit() {
    this.sioCoreLoggerService.info('[SioCoreModalComponent][onSubmit]')    
    this.modal.dismiss('test', 'confirm');
  }

  onWillDismiss(event: Event) {
    this.sioCoreLoggerService.info('[SioCoreModalComponent][onDismiss]'); 
    this.modal.present();
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.sioCoreLoggerService.info('[SioCoreModalComponent][onDismiss]');         
      this.willDismiss.emit(event);
    }
  }

  constructor(
    private sioCoreLoggerService: SioCoreLoggerService,
  ) {
    
  }

  onFocus() {
    this.modal.setCurrentBreakpoint(0.85);
  }

  ngOnInit(): void {
    this.sioCoreLoggerService.debug('[sioCoreModalComponent][ngOnInit]');
    
  }

  ionViewDidEnter() {
    console.error('test');
    this.modal.present();
  }
}
