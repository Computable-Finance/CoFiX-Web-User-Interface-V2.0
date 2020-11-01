import { Component, Input, OnInit } from '@angular/core';

export interface BannerContent {
  title: string;
  descriptions: string[];
  more: { text: string; url: string };
}

@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.page.html',
  styleUrls: ['./tooltips.page.scss'],
})
export class TooltipsPage implements OnInit {
  @Input() tipsTitle: string;
  @Input() tipsContent: string;
  @Input() tipsFooter: string;
  ngOnInit() {}
}
