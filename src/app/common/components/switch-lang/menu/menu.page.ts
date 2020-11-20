import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FOOTER_ITEMS, LANG_ITEMS } from 'src/app/common/constants';
import { SettingsQuery } from 'src/app/state/setting/settings.query';
import { SettingsService } from 'src/app/state/setting/settings.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  @Input() style = 'component';
  menuItems = FOOTER_ITEMS;
  langItems = LANG_ITEMS;

  constructor(
    private translateService: TranslateService,
    public settingsQuery: SettingsQuery,
    private settingsService: SettingsService,
    private popoverController: PopoverController
  ) {}

  changeLang(lang) {
    this.translateService.use(lang);
    this.settingsService.updateLang(lang);

    if (this.style === 'pop') {
      this.popoverController?.dismiss();
    }
  }

  goto(link) {
    window.open(link);
  }

  isSelect(lang) {
    return this.settingsQuery.lang() === lang;
  }
}
