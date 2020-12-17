import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockDirective, MockPipe, MockProvider } from 'ng-mocks';
import { CofiXService } from 'src/app/service/cofix.service';
import { EventBusService } from 'src/app/service/eventbus.service';
import { SkeletonDirective } from '../common/directive/skeleton/skeleton';

import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { Utils } from '../common/utils';
import { BalancesQuery } from '../state/balance/balance.query';
import { MarketDetailsQuery } from '../state/market/market.query';
import { TxService } from '../state/tx/tx.service';
import { SwapPage } from './swap.page';

describe('SwapPage', () => {
  let component: SwapPage;
  let element: HTMLElement;
  let fixture: ComponentFixture<SwapPage>;

  let currentAccount: string;

  beforeEach(() => {
    currentAccount = '';
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(CofiXService, {
          getCurrentAccount: () => {
            return currentAccount;
          },
          isCoFixToken: (token) => {
            return true;
          },
        }),
        MockProvider(BalanceTruncatePipe),
        MockProvider(EventBusService),
        MockProvider(Utils),
        MockProvider(TxService),
        MockProvider(BalancesQuery),
        MockProvider(MarketDetailsQuery),
      ],
      declarations: [
        SwapPage,
        MockPipe(TranslatePipe),
        MockPipe(BalanceTruncatePipe),
        MockDirective(SkeletonDirective),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SwapPage);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should not show approve button when from coin is ETH', () => {
    component.fromCoin.id = 'ETH';
    fixture.detectChanges();
    expect(element.querySelector('.approve-btn')).toBeNull();
  });

  it('should not show approve button when from coin is a ERC20 coin approved', () => {
    component.fromCoin.id = 'HBTC';
    component.fromCoin.isApproved = true;
    fixture.detectChanges();
    expect(element.querySelector('.approve-btn')).toBeNull();
  });

  it('should show approve button when from coin is a ERC20 coin not approved', () => {
    component.fromCoin.id = 'USDT';
    component.fromCoin.isApproved = false;
    fixture.detectChanges();
    expect(element.querySelector('.approve-btn')).not.toBeNull();
  });

  it('should disable approve button when not connected', () => {
    component.fromCoin.id = 'USDT';
    component.fromCoin.isApproved = false;
    fixture.detectChanges();
    expect(
      (element.querySelector('.approve-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable approve button when request is being processed', () => {
    currentAccount = 'test';
    component.fromCoin.id = 'USDT';
    component.fromCoin.isApproved = false;
    component.isLoading.sq = true;
    fixture.detectChanges();
    expect(
      (element.querySelector('.approve-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should enable approve button when connected and no request sent', () => {
    currentAccount = 'test';
    component.fromCoin.id = 'USDT';
    component.fromCoin.isApproved = false;
    fixture.detectChanges();
    expect(
      (element.querySelector('.approve-btn') as HTMLButtonElement).disabled
    ).toBe(false);
  });

  it('should disable swap button when request is being processed', () => {
    component.fromCoin.id = 'ETH';
    component.isLoading.dh = true;
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable swap button when not connected', () => {
    component.fromCoin.id = 'ETH';
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable swap button when from coin (ETH) amount === 0', () => {
    currentAccount = 'test';
    component.fromCoin.id = 'ETH';
    component.fromCoin.amount = '0';
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable swap button when from coin (ETH) balance <= max fee (0.02)', () => {
    currentAccount = 'test';
    component.fromCoin.id = 'ETH';
    component.fromCoin.amount = '0.01';
    component.fromCoin.balance = '0.02';
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable swap button when from coin (ETH) balance <= amount', () => {
    currentAccount = 'test';
    component.fromCoin.id = 'ETH';
    component.fromCoin.amount = '1';
    component.fromCoin.balance = '1';
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable swap button when pool has not enough balance, form coin (ETH)', () => {
    currentAccount = 'test';
    component.fromCoin.id = 'ETH';
    component.toCoin.id = 'USDT';
    component.fromCoin.amount = '1';
    component.fromCoin.balance = '10';
    component.toCoin.amount = '383';
    component.ERC20BalanceOfPair.USDT = '382';
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should enable swap button when form coin (ETH) amount is valid and pool has enough balance', () => {
    currentAccount = 'test';
    component.fromCoin.id = 'ETH';
    component.toCoin.id = 'USDT';
    component.fromCoin.amount = '1';
    component.fromCoin.balance = '10';
    component.toCoin.amount = '383';
    component.ERC20BalanceOfPair.USDT = '500';
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(false);
  });

  it('should disable swap button when from coin (ERC20) is not approved', () => {
    currentAccount = 'test';
    component.fromCoin.id = 'USDT';
    component.fromCoin.isApproved = false;
    fixture.detectChanges();
    expect(
      (element.querySelector('.swap-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable swap button when from coin (ERC20) amount === 0', () => {
    currentAccount = 'test';
    component.fromCoin.id = 'USDT';
    component.fromCoin.isApproved = true;
    component.fromCoin.amount = '0';
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable swap button when from coin (ERC20) balance <= amount', () => {
    currentAccount = 'test';
    component.fromCoin.id = 'USDT';
    component.fromCoin.isApproved = true;
    component.fromCoin.amount = '1';
    component.fromCoin.balance = '1';
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable swap button when pool has not enough balance, form coin (ERC20)', () => {
    currentAccount = 'test';
    component.fromCoin.id = 'USDT';
    component.fromCoin.isApproved = true;
    component.toCoin.id = 'ETH';
    component.fromCoin.amount = '1';
    component.fromCoin.balance = '10';
    component.toCoin.amount = '0.02';
    component.ERC20BalanceOfPair.ETH = '0.01';
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should enable swap button when form coin (ERC20) amount is valid and pool has enough balance', () => {
    currentAccount = 'test';
    component.fromCoin.id = 'USDT';
    component.fromCoin.isApproved = true;
    component.toCoin.id = 'ETH';
    component.fromCoin.amount = '1';
    component.fromCoin.balance = '10';
    component.toCoin.amount = '0.02';
    component.ERC20BalanceOfPair.ETH = '500';
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(false);
  });

  it('should set oracle cost to 0.01 when swaping between ETH and ERC20', () => {
    component.fromCoin.id = 'USDT';
    component.toCoin.id = 'ETH';
    component.changeOracleCost();
    expect(component.oracleCost).toEqual('0.01');

    component.fromCoin.id = 'ETH';
    component.toCoin.id = 'HBTC';
    component.changeOracleCost();
    expect(component.oracleCost).toEqual('0.01');
  });

  it('should set oracle cost to 0.02 when swaping between ERC20 and ERC20', () => {
    component.fromCoin.id = 'USDT';
    component.toCoin.id = 'HBTC';
    component.changeOracleCost();
    expect(component.oracleCost).toEqual('0.02');

    component.fromCoin.id = 'HBTC';
    component.toCoin.id = 'USDT';
    component.changeOracleCost();
    expect(component.oracleCost).toEqual('0.02');
  });
});
