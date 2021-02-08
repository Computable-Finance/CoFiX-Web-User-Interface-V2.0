import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { FOOTER_ITEMS } from '../../constants';
import { MenuPage } from '../lang-button/menu/menu.page';

@Component({
  selector: 'app-footer',
  templateUrl: './footer-component.html',
  styleUrls: ['./footer-component.scss'],
})
export class FooterCompoment implements OnInit {
  public footerItems;
  currentYear: number;
  constructor(private popoverController: PopoverController) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    this.footerItems = FOOTER_ITEMS;
  }

  goto(link) {
    window.open(link);
  }

  async showTools(ev) {
    const popover = await this.popoverController.create({
      component: MenuPage,
      componentProps: { style: 'pop', position: 'footer' },
      cssClass: 'popmenu-class',
      event: ev,
    });
    await popover.present();
  }
}
