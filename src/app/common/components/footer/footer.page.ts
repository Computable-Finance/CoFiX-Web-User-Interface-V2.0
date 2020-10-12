import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FOOTER_ITEMS } from '../../constants';
import { ShareStateQuery } from '../../state/share.query';
import { SiderMenuPage } from '../sider-menu/sider-menu.page';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
  public footerItems;
  walletAddress: string;
  currentYear: number;
  isShowTools = false;
  constructor(
    private shareStateQuery: ShareStateQuery,
    private popoverController: PopoverController
  ) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    this.walletAddress = this.shareStateQuery.getValue().currentAccount;
    this.footerItems = FOOTER_ITEMS;
  }

  goto(link) {
    window.open(link);
  }

  async showSidMenu(event) {
    const popover = await this.popoverController.create({
      component: SiderMenuPage,
      cssClass: 'popover-sidermenu',
      event: event,
      translucent: false,
    });
    await popover.present();
  }

  showTools() {
    this.isShowTools = !this.isShowTools;
  }
}
