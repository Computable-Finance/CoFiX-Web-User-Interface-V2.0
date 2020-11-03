import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[skeleton]',
})
export class SkeletonDirective implements OnInit {
  @Input() isShowSkeleton: boolean = true;
  constructor(private el: ElementRef) {
    /*if(isShowSkeleton)
    el.nativeElement.*/
    console.log(el);
  }
  ngOnInit() {
    if (this.isShowSkeleton) {
      this.el.nativeElement.innerHTML =
        '<ion-skeleton-text animated class="skeleton"></ion-skeleton-text>';
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['isShowSkeleton']) {
      console.log('###');
    }
  }
}
