import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { EventBusService } from 'src/app/service/eventbus.service';
import { SettingsService } from 'src/app/state/setting/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit, OnDestroy {
  @Input() activeId: string;
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

  private eventSubscriptions: Subscription[] = [];
  constructor(
    private settingsService: SettingsService,
    private eventbusService: EventBusService,
    private router: Router
  ) {
    this.eventSubscriptions.push(
      this.eventbusService.on('accountsChanged', (account) => {
        this.settingsService.reset();
        location.reload();
      })
    );
    this.eventSubscriptions.push(
      this.eventbusService.on('chainChanged', (chainId) => {
        this.settingsService.reset();
        location.reload();
      })
    );
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
    this.settingsService.updateActiveTab(tabId);
    this.router.navigateByUrl(tabId);
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
    this.eventSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }
}
