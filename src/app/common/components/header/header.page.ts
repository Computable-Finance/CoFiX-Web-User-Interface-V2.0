import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ShareStateService } from '../../state/share.service';
import { EventBusService } from 'src/app/service/eventbus.service';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ShareStateQuery } from '../../state/share.query';
@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit, OnDestroy {
  @Input() activeId: string;
  @Output() onRefresh = new EventEmitter<any>();
  resizeSubscription: Subscription;
  public tabtems = [
    {
      id: 'swap',
      title: 'swap',
    },
    {
      id: 'liquid',
      title: 'liquid',
    },
    {
      id: 'cofi',
      title: 'cofi',
    },
    {
      id: 'income',
      title: 'income',
    },
  ];
  headerItems: any;
  constructor(
    private shareStateService: ShareStateService,
    private eventbusService: EventBusService,
    private shareStateQuery: ShareStateQuery,
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
    this.changeTabs();
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((event) => {
        this.changeTabs();
      });
  }
  changeTabs() {
    if (window.innerWidth < 870) {
      this.headerItems = [
        {
          id: 'swap',
          title: 'swap',
        },
        {
          id: 'liquid',
          title: 'liquid',
        },
        {
          id: 'cofi',
          title: 'cofi_short',
        },
        {
          id: 'income',
          title: 'income',
        },
      ];
    } else {
      this.headerItems = this.tabtems;
    }
  }
  goto(link) {
    window.open(link);
  }

  selectTab(tabId) {
    this.shareStateService.updateActiveTab(tabId);
    this.router.navigateByUrl(
      `${this.shareStateQuery.getValue().lang}/${tabId}`
    );
  }
  onConnected() {
    this.onRefresh.emit();
  }

  ngOnDestroy() {
    console.log('header destroy---');
    this.resizeSubscription.unsubscribe();
  }
}
