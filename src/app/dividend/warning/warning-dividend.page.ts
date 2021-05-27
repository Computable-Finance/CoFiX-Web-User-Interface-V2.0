import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WarningDetailPage2 } from './warning-detail/warning-detail.page';

@Component({
  selector: 'app-warning-dividend',
  templateUrl: './warning-dividend.page.html',
  styleUrls: ['./warning-dividend.page.scss'],
})
export class WarningDividendPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async showWarning() {
    const modal = await this.modalController.create({
      component: WarningDetailPage2,
      cssClass: 'popover-warning',
      animated: false,
      keyboardClose: false,
      showBackdrop: true,
      backdropDismiss: false,
    });
    await modal.present();
  }
}
