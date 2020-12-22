import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-warning-detail',
  templateUrl: './warning-detail.page.html',
  styleUrls: ['./warning-detail.page.scss'],
})
export class WarningDetailPage implements OnInit {
  constructor(private modalController: ModalController) {}
  private resizeSubscription: Subscription;

  moreDetailTitle: string = 'more_details';

  ngOnInit() {
    console.log('123');
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((event) => {
        this.changeTitle();
      });
    this.changeTitle();
  }

  changeTitle() {
    if (window.innerWidth < 500) {
      this.moreDetailTitle = 'more_details_short';
    } else {
      this.moreDetailTitle = 'more_details';
    }
  }

  async close() {
    this.resizeSubscription.unsubscribe();
    this.modalController.dismiss({ knownRisk: true });
  }
  learnMore() {
    window.open(
      'https://github.com/Computable-Finance/CoFiX-hedger/blob/master/README.md'
    );
  }
}
