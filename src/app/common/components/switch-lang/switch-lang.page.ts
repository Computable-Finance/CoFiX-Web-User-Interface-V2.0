import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShareStateService } from '../../state/share.service';
import { ShareStateQuery } from '../../state/share.query';
@Component({
  selector: 'app-switch-lang',
  templateUrl: './switch-lang.page.html',
  styleUrls: ['./switch-lang.page.scss'],
})
export class SwitchLangPage implements OnInit {
  lang: string = 'zh';
  constructor(
    private translate: TranslateService,
    public shareStateQuery: ShareStateQuery,
    private shareStateService: ShareStateService
  ) {}

  ngOnInit() {
    this.lang = this.shareStateQuery.getValue().lang === 'en' ? 'ENG' : 'ZH';
  }

  changeLang() {
    if (this.shareStateQuery.getValue().lang === 'en') {
      this.translate.use('zh');
      this.lang = 'ZH';
      this.shareStateService.updateLang('zh');
    } else {
      this.translate.use('en');
      this.lang = 'ENG';
      this.shareStateService.updateLang('en');
    }
  }
}