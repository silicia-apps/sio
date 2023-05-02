import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class SioCoreAlertService {
  private _alert!: HTMLIonAlertElement;
  constructor(private alertController: AlertController) {}

  async show(
    name: string = 'error',
    message: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    action: Function
  ): Promise<unknown> {
    const buttons = [];

    buttons.push({
      text: 'CANCEL',
      role: 'cancel',
      handler: () => {
        console.log('KO');
      },
    });

    buttons.push({
      text: 'OK',
      role: 'confirm',
      handler: action(),
    });
    this._alert = await this.alertController.create({
      header: name,
      backdropDismiss: false,
      subHeader: 'Important message',
      message: message,
      buttons: buttons,
    });

    this._alert.present();
    return await this._alert.onDidDismiss();
  }

  async hide() {
    this._alert.dismiss();
  }
}
