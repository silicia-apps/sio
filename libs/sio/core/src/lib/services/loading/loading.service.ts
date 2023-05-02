import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class SioCoreLoadingService {
  private _loading!: HTMLIonLoadingElement;
  constructor(private loadingController: LoadingController) {}

  async create() {
    this._loading = await this.loadingController.create();
  }

  show(message: string) {
    console.log('show loading');
    this._loading.message = message;
    this._loading.present();
  }

  hide() {
    console.log('hide loading');
    this._loading.dismiss();
  }
}
