import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { MockDirective, MockPipe, MockProvider } from 'ng-mocks';
import { CofiXService } from 'src/app/service/cofix.service';
import { EventBusService } from 'src/app/service/eventbus.service';
import { ActionButton } from '../common/components/action-button/action-button';

import { SkeletonDirective } from '../common/directive/skeleton/skeleton';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { Utils } from '../common/utils';
import { TxService } from '../state/tx/tx.service';
import { DividendInfoPage } from './dividend-info.page';

describe('DividendInfoPage', () => {
  let component: DividendInfoPage;
  let element: HTMLElement;
  let fixture: ComponentFixture<DividendInfoPage>;

  let currentAccount: string;

  beforeEach(() => {
    currentAccount = '';
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(ModalController),
        MockProvider(CofiXService, {
          getCurrentAccount: () => {
            return currentAccount;
          },
        }),
        MockProvider(BalanceTruncatePipe),
        MockProvider(EventBusService),
        MockProvider(Utils),
        MockProvider(TxService),
        MockProvider(HttpClient),
      ],
      declarations: [
        DividendInfoPage,
        ActionButton,
        MockPipe(TranslatePipe),
        MockPipe(BalanceTruncatePipe),
        MockDirective(SkeletonDirective),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DividendInfoPage);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should disable withdraw and deposit button when not connected', () => {
    fixture.detectChanges();
    const depositButton = element.querySelector('#claim-eth-button');
    expect((depositButton as HTMLButtonElement).disabled).toBe(true);
    const withdrawButton = element.querySelector('#withdraw-cofi-btn');
    expect((withdrawButton as HTMLButtonElement).disabled).toBe(true);
  });

  it('should disable receive button when ETH not earned', () => {
    currentAccount = 'test';
    component.earnedETH = '0';
    fixture.detectChanges();
    expect(
      (element.querySelector('#claim-eth-button') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should enable receive button when ETH earned', () => {
    currentAccount = 'test';
    component.earnedETH = '1';
    fixture.detectChanges();
    expect(
      (element.querySelector('#claim-eth-button') as HTMLButtonElement).disabled
    ).toBe(false);
  });

  it('should disable receive button when Cofi not earned', () => {
    currentAccount = 'test';
    component.cofiStakingRewards = '0';
    fixture.detectChanges();
    expect(
      (element.querySelector('#withdraw-cofi-btn') as HTMLButtonElement)
        .disabled
    ).toBe(true);
  });

  it('should enable receive button when Cofi earned', () => {
    currentAccount = 'test';
    component.cofiStakingRewards = '1';
    fixture.detectChanges();
    expect(
      (element.querySelector('#withdraw-cofi-btn') as HTMLButtonElement)
        .disabled
    ).toBe(false);
  });
});
