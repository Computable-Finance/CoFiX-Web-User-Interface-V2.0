import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { MenuPage } from './menu/menu.page';

@Component({
  selector: 'app-lang-button',
  templateUrl: './lang-button.html',
  styleUrls: ['./lang-button.scss'],
})
export class LangButton {
  constructor(private popoverController: PopoverController) {}

  async showLang(ev) {
    const popover = await this.popoverController.create({
      component: MenuPage,
      componentProps: { style: 'pop' },
      cssClass: 'menu-class',
      event: ev,
    });
    await popover.present();
  }
}
