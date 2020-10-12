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
  @Input() img: string = 'exchanged-bg.png';
  @Input() bannerConent: BannerContent;
  constructor() {}
  ngOnInit() {}
  goto(link) {
    window.open(link);
  }
}
