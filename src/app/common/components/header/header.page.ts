import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ShareStateService } from '../../state/share.service';
import { ShareStateQuery } from '../../state/share.query';
import { EventBusService } from 'src/app/service/eventbus.service';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit, OnDestroy {
  @Input() activeId: string;
  @Output() onRefresh = new EventEmitter<any>();
  resizeSubscription: Subscription;
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
  constructor(
    public shareStateQuery: ShareStateQuery,
    private shareStateService: ShareStateService,
    private eventbusService: EventBusService,
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
    console.log(window.innerWidth);
    if (window.innerWidth < 870) {
      this.headerItems = [
        {
          id: 'swap',
        },
        {
          id: 'liquid',
        },
        {
          id: 'cofi_short',
        },
        {
          id: 'income',
        },
      ];
    } else {
      this.headerItems = [
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
    }
  }
  goto(link) {
    window.open(link);
  }

  selectTab(tabId) {
    this.shareStateService.updateActiveTab(tabId);
    this.router.navigateByUrl(tabId);
  }
  onConnected() {
    this.onRefresh.emit();
  }

  ngOnDestroy() {
    console.log('header destroy---');
    this.resizeSubscription.unsubscribe();
  }
}
