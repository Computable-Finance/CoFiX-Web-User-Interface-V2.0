import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-token-info',
  templateUrl: './token-info.page.html',
  styleUrls: ['./token-info.page.scss'],
})
export class TokenInfoPage {
  @Input() infoTitle: string;
  @Input() token: string;
  @Input() tokenBalance: string;
  @Input() alertTitle: string;
  @Input() alertContent: string;
  @Input() showZeroInfo = false;
  @Input() questionImgName = 'question';

  constructor() {}
}
