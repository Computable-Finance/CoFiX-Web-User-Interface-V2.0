import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-warning-detail',
  templateUrl: './warning-detail.page.html',
  styleUrls: ['./warning-detail.page.scss'],
})
export class WarningDetailPage2 implements OnInit {
  constructor(private modalController: ModalController) {}
  private resizeSubscription: Subscription;

  moreDetailTitle: string = 'more_details';

  ngOnInit() {
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
      'https://github.com/Computable-Finance/Doc/blob/master/CoFiX%20V2.0%20Upgrade%20Document.pdf'
    );
  }
}
