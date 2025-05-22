import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentRef } from '@ionic/core';
@Injectable({
  providedIn: 'root',
})
export class SioCoreModalService {
  private _modal!: HTMLIonModalElement;
  constructor(private modalController: ModalController) {}

  async create(page: ComponentRef) {
    this._modal = await this.modalController.create({
      component: page,
    })
  }

  show() {
    console.log('show modal');
    this._modal.present();
  }

  hide() {
    console.log('hide modal');
    this._modal.dismiss();
  }
}
