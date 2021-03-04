import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SettingsService } from 'src/app/state/setting/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.scss'],
})
export class HeaderCompoment implements OnInit, OnDestroy {
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
      id: 'dividend',
      title: 'dividend',
    },
  ];

  headerItems: any;

  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) {}

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
          id: 'dividend',
          title: 'dividend',
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
    this.router.navigateByUrl(tabId).catch((e) => {
      this.router.navigateByUrl('swap');
    });
  }

  ngOnDestroy() {
    this.resizeSubscription.unsubscribe();
  }
}
