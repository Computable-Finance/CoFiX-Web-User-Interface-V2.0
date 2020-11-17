import { Component, Input, OnInit } from '@angular/core';

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
  @Input() showZeroInfo = false;
  @Input() questionImgName = 'question';
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
