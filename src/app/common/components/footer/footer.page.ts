import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FOOTER_ITEMS } from '../../constants';
import { ShareStateQuery } from '../../state/share.query';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
  @Output() onRefresh = new EventEmitter<any>();
  public footerItems;
  walletAddress: string;
  currentYear: number;
  isShowTools = false;
  constructor(private shareStateQuery: ShareStateQuery) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    this.walletAddress = this.shareStateQuery.getValue().currentAccount;
    this.footerItems = FOOTER_ITEMS;
  }

  goto(link) {
    window.open(link);
  }

  showTools() {
    this.isShowTools = !this.isShowTools;
  }

  onConnected() {
    this.onRefresh.emit();
  }
}
