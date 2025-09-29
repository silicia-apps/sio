import { Injectable, ViewChildren, QueryList } from '@angular/core';
import { IonRouterOutlet, ActionSheetController, PopoverController, ModalController, MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutocloseOverlaysService {
  /** QueryList dei router outlet presenti nel componente per potenziali
   * operazioni di chiusura/navigazione. Viene popolata tramite decorator
   * `@ViewChildren` quando il servizio è usato in un contesto con view.
   */
  @ViewChildren(IonRouterOutlet)
  routerOutlets!: QueryList<IonRouterOutlet>;

  // Timestamp dell'ultimo back press rilevato (telefonico / hardware)
  lastTimeBackPress = 0;
  // Intervallo in ms entro il quale un doppio backpress dovrebbe uscire
  timePeriodToExit = 2000;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private menu: MenuController,
  ) { }

  /**
   * Metodo che prova a chiudere qualunque overlay aperto (action sheet,
   * popover, modal, menu). Utilizzato tipicamente alla pressione del
   * pulsante "back" su Android per evitare che l'app si chiuda se
   * un overlay è ancora aperto.
   *
   * Strategia:
   *  - controlla l'action sheet, se presente lo chiude
   *  - altrimenti controlla il popover, poi il modal e infine il menu
   *  - ogni operazione è racchiusa in try/catch per non bloccare il flusso
   *    in caso di errori nel layer UI
   */
  async trigger() {
    console.log('backbutton triggered');

    // Close action sheet se presente
    try {
      const element = await this.actionSheetCtrl.getTop();
      if (element) {
        element.dismiss();
        return;
      }
    } catch (error) {
      // Non vogliamo interrompere la sequenza se qualcosa va storto
      console.log(error);
    }

    // Close popover se presente
    try {
      const element = await this.popoverCtrl.getTop();
      if (element) {
        element.dismiss();
        return;
      }
    } catch (error) {
      console.log(error);
    }

    // Close modal se presente
    try {
      const element = await this.modalCtrl.getTop();
      if (element) {
        element.dismiss();
        return;
      }
    } catch (error) {
      console.log(error);

    }

    // Close menu laterale se aperto
    try {
      const element = await this.menu.getOpen();
      if (element !== null) {
        this.menu.close();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }
}