import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShareStateService } from '../../state/share.service';
import { ShareStateQuery } from '../../state/share.query';
import { PopoverController } from '@ionic/angular';
import { MenuPage } from './menu/menu.page';
@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.page.html',
  styleUrls: ['./switch-lang.page.scss'],
})
export class SwitchLangPage implements OnInit {
  constructor(
    private translate: TranslateService,
    public shareStateQuery: ShareStateQuery,
    private shareStateService: ShareStateService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    var lang = navigator.language; //常规浏览器语言和IE浏览器
    lang = lang.substr(0, 2); //截取lang前2位字符
    if (lang !== 'zh' && lang !== 'en') {
      this.translate.use('en');
    }
  }
  async showLang(ev) {
    const popover = await this.popoverController.create({
      component: MenuPage,
      cssClass: 'menu-class',
      event: ev,
    });
    await popover.present();
  }
}
