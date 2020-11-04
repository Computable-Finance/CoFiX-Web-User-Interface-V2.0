import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShareStateService } from '../../state/share.service';
import { ShareStateQuery } from '../../state/share.query';
import { EventBusService } from 'src/app/service/eventbus.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  @Input() activeId: string;
  @Output() onRefresh = new EventEmitter<any>();
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
  ngOnInit() {}

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
}
