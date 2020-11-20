import { Component, OnInit } from '@angular/core';

import { FOOTER_ITEMS } from '../../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer-component.html',
  styleUrls: ['./footer-component.scss'],
})
export class FooterCompoment implements OnInit {
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
}
