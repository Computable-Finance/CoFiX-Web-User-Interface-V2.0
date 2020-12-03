import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe } from 'ng-mocks';

import { TipPannel } from './tip-pannel';

describe('TipPannel', () => {
  let component: TipPannel;
  let element: HTMLElement;
  let fixture: ComponentFixture<TipPannel>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: [TipPannel, MockPipe(TranslatePipe)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TipPannel);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.tipPannelContent = {
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
