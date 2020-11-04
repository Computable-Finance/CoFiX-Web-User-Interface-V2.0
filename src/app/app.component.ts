import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { DB_VERSION } from './common/constants';
import { ShareStateQuery } from './common/state/share.query';
import { CofiXService } from './service/cofix.service';
import { MetadataQuery } from './state/metadata/metadata.query';
import { MetadataService } from './state/metadata/metadata.service';
import { HuAndHuService } from './_integration/hu-and-hu.service';


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
    private translate: TranslateService,
    public shareStateQuery: ShareStateQuery,
    private cofixService: CofiXService,
    private router: Router,
    private metadataQuery: MetadataQuery,
    private metadataService: MetadataService,
    private huAndHuService: HuAndHuService,
    @Inject('persistStorage') private persistStorage
  ) {
    this.initializeApp();
    // uncomment below to run huAndHuService:
    this.huAndHuService
      .connect()
      .pipe(filter((value) => Object.keys(value).length !== 0))
      .subscribe((val) => {
        console.log("CoFi instances");
        Object.keys(val.CoFi).forEach((k) =>
            console.log(val.CoFi[k])
        );
        console.log("LiquidityPoolShare instances");
        Object.keys(val.LiquidityPoolShare).forEach((k) =>
            console.log(val.LiquidityPoolShare[k])
        );
        console.log("MiningPoolShare instances");
        Object.keys(val.MiningPoolShare).forEach((k) =>
            console.log(val.MiningPoolShare[k])
        );
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.initConnectIfEnabled();
      this.initTranslate();
      this.cleanOldStorageSchemas();
    });
  }

  initTranslate() {
    this.translate.setDefaultLang(this.shareStateQuery.getValue().lang);
  }

  async initConnectIfEnabled() {
    if (await this.cofixService.isEnabled()) {
      await this.cofixService.connectSilently();
    }
  }

  cleanOldStorageSchemas() {
    const version = this.metadataQuery.dbVersion();
    if (!version || version !== DB_VERSION) {
      console.log(`clean old storage schema: ${version} -> ${DB_VERSION}`);

      this.persistStorage.clearStore();
      this.metadataService.updateDbVersion(DB_VERSION);
    }
  }

  ngOnInit() {
    this.router.navigateByUrl(this.shareStateQuery.getValue().activeTab);
  }
}
