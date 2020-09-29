import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AlertButton } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class PresentService {

  private loader: HTMLIonLoadingElement;
  private isLoaderShowing: boolean = false;

  constructor(private loadingController: LoadingController, private alertController: AlertController) { }

  public async presentLoader(message?: string): Promise<void> {
    if (!this.isLoaderShowing) {
      this.loader = await this.loadingController.create({
        message: message || '',
        showBackdrop: true,
        animated: true,
        spinner: 'crescent',
        mode: 'ios'
      });
      this.isLoaderShowing = true;
      return await this.loader.present();
    } else {
      // If loader is showing, only change text, won't create a new loader.
      this.isLoaderShowing = true;
      this.loader.message = message;
    }
  }

  public async dismissLoader(): Promise<void> {
    this.isLoaderShowing = false;
    if (this.loader) {
      await this.loader.dismiss();
    }
  }

  public async presentConfirmAlert(title: string, message: string, okHandler: Function): Promise<void> {
    await this.showAlert(title, message, [
      { text: 'CANCEL' },
      { text: 'OK', handler: (): void => okHandler() }
    ]);
  }

  private async showAlert(
    header: string,
    message: string,
    buttons?: Array<AlertButton>
  ): Promise<void> {
    const alert: HTMLIonAlertElement = await this.alertController.create({
      header: header,
      message: message,
      buttons: buttons,
      cssClass: 'ati-no-scroll',
      mode: 'ios'
    });
    await alert.present();
  }

}
