import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSkeleton]',
})
export class SkeletonDirective {
  @Input() skCss = '';

  private skelton;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.skelton = this.renderer.createElement('ion-skeleton-text');
    if (this.skCss) {
      this.renderer.addClass(this.skelton, this.skCss);
    }
    this.renderer.addClass(this.skelton, 'skeleton-text-animated');
  }

  @Input() set appSkeleton(condition: boolean) {
    if (condition) {
      this.el.nativeElement.hidden = true;
      this.renderer.appendChild(
        this.el.nativeElement.parentElement,
        this.skelton
      );
    } else {
      this.el.nativeElement.hidden = false;
      this.renderer.removeChild(
        this.el.nativeElement.parentElement,
        this.skelton
      );
    }
  }
}
