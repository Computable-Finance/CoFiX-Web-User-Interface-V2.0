import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[skeleton]',
})
export class SkeletonDirective implements OnInit {
  @Input() cssName: string = '';
  constructor(private el: ElementRef) {}
  ngOnInit() {
    this.el.nativeElement.innerHTML = `<ion-skeleton-text class="${this.cssName} skeleton-text-animated"></ion-skeleton-text>`;
  }
}
