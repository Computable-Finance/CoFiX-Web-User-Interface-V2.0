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
import { SettingsService } from '../state/setting/settings.service';
import { TxService } from '../state/tx/tx.service';
import { CofiPage } from './cofi.page';

describe('CofiPage', () => {
  let component: CofiPage;
  let element: HTMLElement;
  let fixture: ComponentFixture<CofiPage>;

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
        }),
        MockProvider(BalanceTruncatePipe),
        MockProvider(EventBusService),
        MockProvider(Utils),
        MockProvider(TxService),
        MockProvider(SettingsService),
        MockProvider(BalancesQuery),
        MockProvider(MarketDetailsQuery),
      ],
      declarations: [
        CofiPage,
        MockPipe(TranslatePipe),
        MockPipe(BalanceTruncatePipe),
        MockDirective(SkeletonDirective),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CofiPage);
    component = fixture.componentInstance;
    component.isDeposit = false;
    element = fixture.nativeElement;
  });

  it('should show approve button when not approved and deposit set and wallet connected', () => {
    component.isApproved = false;
    component.isDeposit = true;
    currentAccount = 'test';
    fixture.detectChanges();
    expect(element.querySelector('.approve-btn')).not.toBeNull();
  });

  it('should hide approve button when approved', () => {
    component.isApproved = true;
    fixture.detectChanges();
    expect(element.querySelector('.approve-btn')).toBeNull();
  });

  it('should hide approve button when deposit not set', () => {
    component.isDeposit = false;
    fixture.detectChanges();
    expect(element.querySelector('.approve-btn')).toBeNull();
  });

  it('should hide approve button when wallet not connected', () => {
    fixture.detectChanges();
    expect(element.querySelector('.approve-btn')).toBeNull();
  });

  it('should disable withdraw button when a pending request', () => {
    component.isApproved = true;
    component.isLoading.qc = true;
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable withdraw button when amount is 0', () => {
    component.isApproved = true;
    component.cofiBalance = '0';
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should disable withdraw button when deposit set and not approved', () => {
    component.cofiBalance = '10';
    component.isDeposit = true;
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should enable withdraw button when a valid amount and deposit not set', () => {
    component.cofiBalance = '10';
    component.isDeposit = false;
    fixture.detectChanges();

    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(false);
  });

  it('should enable withdraw button when a valid amount, deposit set and approved', () => {
    component.cofiBalance = '10';
    component.isDeposit = true;
    component.isApproved = true;
    fixture.detectChanges();
    expect(
      (element.querySelector('.full-btn') as HTMLButtonElement).disabled
    ).toBe(false);
  });
});
