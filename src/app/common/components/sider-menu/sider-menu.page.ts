import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShareStateService } from '../../state/share.service';
import { ShareStateQuery } from '../../state/share.query';
import { FOOTER_ITEMS } from '../../constants';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-sider-menu',
  templateUrl: './sider-menu.page.html',
  styleUrls: ['./sider-menu.page.scss'],
})
export class SiderMenuPage implements OnInit {
  footerItems: any;
  constructor(private popoverController: PopoverController) {}

  ngOnInit() {
    this.footerItems = FOOTER_ITEMS;
  }

  goto(link) {
    window.open(link);
  }

  close() {
    this.popoverController.dismiss();
  }
}
