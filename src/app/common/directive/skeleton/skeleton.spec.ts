import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { MockProvider } from 'ng-mocks';
import { SkeletonDirective } from './skeleton';

@Component({
  template: '<div><div [appSkeleton]="condition">test</div></div>',
})
class TestComponent {
  condition: boolean;

  constructor() {
    this.condition = true;
  }
}

describe('SkeletonDirective', () => {
  it('should work', () => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [MockProvider(TranslateService)],
      declarations: [TestComponent, SkeletonDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;
    const element = fixture.nativeElement;

    // true
    fixture.detectChanges();
    expect(element.querySelector('.skeleton-text-animated')).not.toBeNull();

    // false
    component.condition = false;
    fixture.detectChanges();
    expect(element.querySelector('.skeleton-text-animated')).toBeNull();
  });
});
