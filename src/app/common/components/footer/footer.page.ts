import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FOOTER_ITEMS } from '../../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
  @Output() onRefresh = new EventEmitter<any>();
  public footerItems;
  currentYear: number;
  isShowTools = false;
  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
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
