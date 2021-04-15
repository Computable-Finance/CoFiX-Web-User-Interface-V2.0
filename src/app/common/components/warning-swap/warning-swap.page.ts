import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-warning-swap',
  templateUrl: './warning-swap.page.html',
  styleUrls: ['./warning-swap.page.scss'],
})
export class WarningSwapPage implements OnInit {
  constructor(private modalController: ModalController) {}
  private resizeSubscription: Subscription;

  @Input() warningTitle: string = 'warning_swap_title';
  @Input() warningContent: string = 'warning_swap_content';

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
    this.modalController.dismiss(true);
  }

  learnMore() {
    window.open(
      'https://github.com/Computable-Finance/CoFiX-hedger/blob/master/README.md'
    );
  }
}
