import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NgModel } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { MockDirective, MockPipe, MockProvider } from 'ng-mocks';

import { BalanceTruncatePipe } from '../../pipes/balance.pipe';
import { CoinInput } from './coin-input';

describe('CoinInput', () => {
  let component: CoinInput;
  let element: HTMLElement;
  let fixture: ComponentFixture<CoinInput>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(ModalController),
        MockProvider(BalanceTruncatePipe),
      ],
      declarations: [
        CoinInput,
        MockPipe(TranslatePipe),
        MockPipe(BalanceTruncatePipe),
        MockDirective(NgModel),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinInput);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should select a coin when isSelectCoin === true', () => {
    component.coin = 'USDT';
    component.isSelectCoin = true;
    fixture.detectChanges();
    expect(element.querySelector('.sel')).not.toBeNull();
  });

  it('should not select a coin when isSelectCoin === false', () => {
    component.coin = 'USDT';
    component.isSelectCoin = false;
    fixture.detectChanges();
    expect(element.querySelector('.sel')).toBeNull();
  });

  it('should show error message when one of [isShowError, isInsufficientError, overLiquid()] is false', () => {
    [
      {
        coin: 'USDT',
        isShowError: true,
        isInsufficientError: false,
        amount: '1',
        maxLiquid: '2',
        expected: 1,
      },
      {
        coin: 'USDT',
        isShowError: false,
        isInsufficientError: false,
        amount: '3',
        maxLiquid: '2',
        expected: 1,
      },
      {
        coin: 'USDT',
        isShowError: true,
        isInsufficientError: false,
        amount: '3',
        maxLiquid: '2',
        expected: 2,
      },
    ].forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'expected') {
          component[key] = item[key];
        }
      });
      fixture.detectChanges();
      expect(element.querySelectorAll('.error').length).toEqual(item.expected);
    });
  });

  it('should clickMax emit current coin', () => {
    let currentCoin;
    component.clickMax.subscribe((event) => (currentCoin = event.coin));
    component.coin = 'USDT';
    component.setMax();
    expect(currentCoin).toEqual('USDT');
  });

  it('should changeValue emit current coin and current amount', fakeAsync(() => {
    component.coin = 'USDT';
    component.amount = '100';
    component.ngOnInit();

    let currentCoin;
    let currentAmount;

    component.changeValue.subscribe((event) => {
      currentCoin = event.coin;
      currentAmount = event.amount;
    });

    component.modelChanged.next();

    tick(1000);

    expect(currentCoin).toEqual('USDT');
    expect(currentAmount).toEqual('100');
  }));
});
