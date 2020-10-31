import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { ShareStateQuery } from './common/state/share.query';
import { ShareStateService } from './common/state/share.service';
import { CofiXService } from './service/cofix.service';

type State = { lang: string };

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Inbox',
      url: '/folder/Inbox',
      icon: 'mail',
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane',
    },
  ];
  public labels = ['Family', 'Friends'];

  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    //private statusBar: StatusBar,
    private translate: TranslateService,
    public shareStateQuery: ShareStateQuery,
    private cofixService: CofiXService,
    private shareStateService: ShareStateService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.initConnectIfEnabled();
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.initTranslate();
    });
  }

  initTranslate() {
    this.translate.setDefaultLang(this.shareStateQuery.getValue().lang);
  }

  async initConnectIfEnabled() {
    if (await this.cofixService.isEnabled()) {
      await this.cofixService.connectSilently();

      this.shareStateService.updateConnectedWallet(true);
      this.shareStateService.updateCurrentAccount(
        this.cofixService.getCurrentAccount()
      );
    }
  }

  ngOnInit() {
    this.router.navigateByUrl(this.shareStateQuery.getValue().activeTab);
  }
}
