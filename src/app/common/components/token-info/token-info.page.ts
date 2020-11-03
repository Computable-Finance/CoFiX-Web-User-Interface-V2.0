import { Component, Input, OnInit } from '@angular/core';

export interface BannerContent {
  title: string;
  descriptions: string[];
  more: { text: string; url: string };
}

@Component({
  selector: 'app-taken-info',
  templateUrl: './token-info.page.html',
  styleUrls: ['./token-info.page.scss'],
})
export class TokenInfoPage implements OnInit {
  @Input() infoTitle: string;
  @Input() token: string;
  @Input() tokenBalance: any;
  @Input() alertTitle: string;
  @Input() alertContent: string;
  @Input() showZeroInfo: boolean = false;
  @Input() questionImgName: string = 'question';
  constructor() {}
  ngOnInit() {}
  showSkeleton() {
    return (
      this.tokenBalance === undefined ||
      this.tokenBalance === '' ||
      this.tokenBalance === null
    );
  }
}
