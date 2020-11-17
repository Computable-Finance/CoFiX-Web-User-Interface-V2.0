import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';

import { BannerPage } from './banner.page';

describe('TipPannel', () => {
  let component: BannerPage;
  let element: HTMLElement;
  let fixture: ComponentFixture<BannerPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: [BannerPage, MockPipe(TranslatePipe)],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerPage);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.bannerConent = {
      title: '',
      descriptions: [],
      more: { text: '', url: '' },
    };
  });

  it('should work', () => {
    component.isShowDetail = false;
    fixture.detectChanges();
    expect(element.querySelector('.detail-content')).toBeNull();

    component.showDetailClick({ isDown: true });
    fixture.detectChanges();
    expect(element.querySelector('.detail-content')).not.toBeNull();

    component.showDetailClick({ isDown: false });
    fixture.detectChanges();
    expect(element.querySelector('.detail-content')).toBeNull();
  });
});
