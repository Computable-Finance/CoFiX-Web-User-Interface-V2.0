import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Utils } from '../../utils';

export interface BannerContent {
  title: string;
  descriptions: string[];
  more: { text: string; url: string };
}

@Component({
  selector: 'app-taken-info',
  templateUrl: './token-info.page.html',
  styleUrls: ['./token-info.page.scss'],
})
export class TokenInfoPage implements OnInit {
  @Input() infoTitle: string;
  @Input() token: string;
  @Input() tokenBalance: any;
  @Input() alertTitle: string;
  @Input() alertContent: string;
  constructor(
    private alertController: AlertController,
    private translateService: TranslateService,
    private utils: Utils
  ) {}
  ngOnInit() {}
  async showAlert() {
    this.utils.showAlert(this.alertTitle, this.alertContent);
    /*const alert = await this.alertController.create({
      cssClass: 'explain-liquid-alert',
      header: await this.translateService.get(this.alertTitle).toPromise(),
      message: await this.translateService.get(this.alertContent).toPromise(),
      buttons: [
        {
          text: await this.translateService.get('comfirm_text').toPromise(),
        },
      ],
    });
    await alert.present();*/
  }
}
