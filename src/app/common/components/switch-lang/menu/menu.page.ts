import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopoverController } from '@ionic/angular';
import { ShareStateQuery } from 'src/app/common/state/share.query';
import { ShareStateService } from 'src/app/common/state/share.service';
import { FOOTER_ITEMS, LANG_ITEMS } from 'src/app/common/constants';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @Input() style: string = 'component';
  menuItems: any;
  langItems: any;
  constructor(
    private translate: TranslateService,
    public shareStateQuery: ShareStateQuery,
    private shareStateService: ShareStateService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.menuItems = FOOTER_ITEMS;
    this.langItems = LANG_ITEMS;
  }

  changeLang(lang) {
    this.translate.use(lang);
    this.shareStateService.updateLang(lang);
    if (this.style === 'pop') {
      this.popoverController?.dismiss();
    }
  }
  goto(link) {
    window.open(link);
  }
  isSelect(lang) {
    return this.shareStateQuery.getValue().lang === lang;
  }
}
