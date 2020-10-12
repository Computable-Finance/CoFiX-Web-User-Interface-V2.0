import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-explain-liquid',
  templateUrl: './explain-liquid.page.html',
  styleUrls: ['./explain-liquid.page.scss'],
})
export class ExplainLiquidPage implements OnInit {
  @Input() todoValue: string;
  @Input() hadValue: string;
  @Input() NAVPerShare: string;

  @Input('coin')
  set coin(value: string) {
    this._coin = value;
    if (this.coin === 'USDT') {
      this.xtValue = 'XT-1';
    } else {
      this.xtValue = 'XT-2';
    }
  }
  _coin: string;
  get coin(): string {
    return this._coin;
  }

  xtValue: string = 'XT-1';
  constructor(
    private alertController: AlertController,
    private translateService: TranslateService
  ) {}

  ngOnInit() {}

  async showAlert() {
    const alert = await this.alertController.create({
      cssClass: 'explain-liquid-alert',
      header: await this.translateService.get('jzsm_title').toPromise(),
      message:
        (await this.translateService.get('jzsm_cont1').toPromise()) +
        '</br>' +
        (await this.translateService.get('jzsm_cont2').toPromise()) +
        '</br>' +
        (await this.translateService.get('jzsm_cont3').toPromise()),
      buttons: [
        {
          text: await this.translateService.get('comfirm_text').toPromise(),
        },
      ],
    });
    await alert.present();
  }
}
