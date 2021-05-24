import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appSkeleton]',
})
export class SkeletonDirective implements OnDestroy {
  @Input() skCss = '';

  private skelton;
  private timeOut = false;
  private timeOutTimer;
  private timeoutText;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private translate: TranslateService
  ) {
    this.skelton = this.renderer.createElement('ion-skeleton-text');
    if (this.skCss) {
      this.renderer.addClass(this.skelton, this.skCss);
    }
    this.renderer.addClass(this.skelton, 'skeleton-text-animated');

    this.timeoutText = this.renderer.createElement('div');

    this.timeOutTimer = setTimeout(() => (this.timeOut = true), 5000);
  }

  @Input() set appSkeleton(condition: boolean) {
    if (condition) {
      this.removeError();
      this.addSkeleton();
    } else if (this.timeOut) {
      console.log('timeout');
      this.removeSkeleton();
      this.addError();
    } else {
      this.removeSkeleton();
    }
  }

  removeSkeleton() {
    this.el.nativeElement.hidden = false;
    this.renderer.removeChild(
      this.el.nativeElement.parentElement,
      this.skelton
    );
  }

  addSkeleton() {
    this.el.nativeElement.hidden = true;
    this.renderer.appendChild(
      this.el.nativeElement.parentElement,
      this.skelton
    );
  }

  async addError() {
    this.timeoutText.setAttribute('id', 'price_error');
    this.timeoutText.innerHTML = await this.translate
      .get('price_error')
      .toPromise();
    this.renderer.addClass(this.timeoutText, 'error');
    this.el.nativeElement.hidden = true;
    this.renderer.appendChild(
      this.el.nativeElement.parentElement,
      this.timeoutText
    );
  }

  removeError() {
    let el = document.getElementById('price_error');
    if (el) {
      this.el.nativeElement.hidden = false;
      this.renderer.removeChild(
        this.el.nativeElement.parentElement,
        this.timeoutText
      );
    }
  }

  ngOnDestroy() {
    this.timeOutTimer = undefined;
  }
}
