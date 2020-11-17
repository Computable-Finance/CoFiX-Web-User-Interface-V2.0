import { Component, Input, OnInit } from '@angular/core';

export interface BannerContent {
  title: string;
  descriptions: string[];
  more: { text: string; url: string };
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
})
export class BannerPage implements OnInit {
  @Input() bannerConent: BannerContent;

  isShowDetail = false;

  constructor() {}

  ngOnInit() {}

  goto(link: string) {
    window.open(link);
  }

  showDetailClick(event) {
    this.isShowDetail = event.isDown;
  }
}
