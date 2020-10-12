import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ShareStateService } from '../../state/share.service';
import { ShareStateQuery } from '../../state/share.query';
import { EventBusService } from 'src/app/service/eventbus.service';
import { CofiXService } from 'src/app/service/cofix.service';
import { Utils } from '../../utils';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  @Input() activeId: string;
  public headerItems = [
    {
      id: 'swap',
    },
    {
      id: 'liquid',
    },
    {
      id: 'cofi',
    },
    {
      id: 'income',
    },
  ];
  lang: string = 'zh';
  constructor(
    private translate: TranslateService,
    public shareStateQuery: ShareStateQuery,
    private shareStateService: ShareStateService,
    private eventbusService: EventBusService,
    private cofixService: CofiXService,
    private utils: Utils,
    private router: Router
  ) {
    this.eventbusService.on('accountsChanged', (account) => {
      this.shareStateService.reset();
      location.reload();
    });
    this.eventbusService.on('chainChanged', (chainId) => {
      this.shareStateService.reset();
      location.reload();
    });
  }
  ngOnInit() {
    this.lang = this.shareStateQuery.getValue().lang;
  }

  goto(link) {
    window.open(link);
  }

  changeLang(lang) {
    this.translate.use(lang);
    this.lang = lang;
    this.shareStateService.updateLang(lang);
  }

  selectTab(tabId) {
    this.shareStateService.updateActiveTab(tabId);
    this.router.navigateByUrl(tabId);
  }
}
