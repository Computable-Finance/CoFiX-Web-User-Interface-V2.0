import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-title',
  templateUrl: './card-title.html',
  styleUrls: ['./card-title.scss'],
})
export class CardTitlePage {
  @Input() cardTitle: string;
  @Input() cardSubTitle: string;
  @Input() alertTitle: string;
  @Input() alertContent: string;

  constructor() {}
}
