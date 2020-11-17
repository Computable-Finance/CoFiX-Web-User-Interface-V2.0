import { Component, Input, OnInit } from '@angular/core';
import { Utils } from '../../utils';

@Component({
  selector: 'app-card-title',
  templateUrl: './card-title.page.html',
  styleUrls: ['./card-title.page.scss'],
})
export class CardTitlePage implements OnInit {
  @Input() cardTitle: string;
  @Input() cardSubTitle: string;
  @Input() alertTitle: string;
  @Input() alertContent: string;
  constructor(private utils: Utils) {}
  ngOnInit() {}
}
