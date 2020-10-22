import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-warning-detail',
  templateUrl: './warning-detail.page.html',
  styleUrls: ['./warning-detail.page.scss'],
})
export class WarningDetailPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async close() {
    this.modalController.dismiss({ knownRisk: true });
  }
  learnMore() {
    window.open(
      'https://github.com/Computable-Finance/CoFiX-hedger/blob/master/README.md'
    );
  }
}
