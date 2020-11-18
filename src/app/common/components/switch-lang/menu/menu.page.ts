import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopoverController } from '@ionic/angular';
import { FOOTER_ITEMS, LANG_ITEMS } from 'src/app/common/constants';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/state/setting/settings.service';
import { SettingsQuery } from 'src/app/state/setting/settings.query';
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
    public settingsQuery: SettingsQuery,
    private settingsService: SettingsService,
    private popoverController: PopoverController,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuItems = FOOTER_ITEMS;
    this.langItems = LANG_ITEMS;
  }

  changeLang(lang) {
    this.translate.use(lang);
    this.settingsService.updateLang(lang);

    if (this.style === 'pop') {
      this.popoverController?.dismiss();
    }
    const tabId = this.router.url.split('/')[2];
    this.router.navigateByUrl(`${lang}/${tabId}`);
  }
  goto(link) {
    window.open(link);
  }
  isSelect(lang) {
    return this.settingsQuery.lang() === lang;
  }
}
