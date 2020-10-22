import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { WarningDetailPage } from './warning-detail/warning-detail.page';

@Component({
  selector: 'app-warning-liquid',
  templateUrl: './warning-liquid.page.html',
  styleUrls: ['./warning-liquid.page.scss'],
})
export class WarningLiquidPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async showWarning() {
    const modal = await this.modalController.create({
      component: WarningDetailPage,
      cssClass: 'popover-warning',
      animated: false,
      keyboardClose: false,
      showBackdrop: true,
      backdropDismiss: false,
    });
    await modal.present();
  }
}
