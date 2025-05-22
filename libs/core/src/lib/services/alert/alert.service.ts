/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SioCoreAlertService {
  private _alert!: HTMLIonAlertElement;
  constructor(private alertController: AlertController) {}

  async show(
    name = 'error',
    message: string,
    action: Function, 
    cancel: boolean = false,

  ): Promise<unknown> {
    const buttons = [];

    if (cancel) buttons.push({
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
      subHeader: undefined,
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
