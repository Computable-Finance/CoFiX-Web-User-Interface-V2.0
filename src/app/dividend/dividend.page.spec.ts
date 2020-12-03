import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatePipe } from '@ngx-translate/core';
import { MockDirective, MockPipe, MockProvider } from 'ng-mocks';
import { CofiXService } from 'src/app/service/cofix.service';
import { EventBusService } from 'src/app/service/eventbus.service';

import { SkeletonDirective } from '../common/directive/skeleton/skeleton';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { Utils } from '../common/utils';
import { TxService } from '../state/tx/tx.service';
import { DividendPage } from './dividend.page';

describe('DividendPage', () => {
  let component: DividendPage;
  let element: HTMLElement;
  let fixture: ComponentFixture<DividendPage>;

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
      ],
      declarations: [
        DividendPage,
        MockPipe(TranslatePipe),
        MockPipe(BalanceTruncatePipe),
        MockDirective(SkeletonDirective),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DividendPage);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should disable withdraw and deposit button when not connected', () => {
    fixture.detectChanges();
    const buttons = element.querySelectorAll('.approve-btn');
    expect(buttons.length).toBe(2);
    expect((buttons[0] as HTMLButtonElement).disabled).toBe(true);
    expect((buttons[1] as HTMLButtonElement).disabled).toBe(true);
  });

  it('should enable withdraw and deposit button when connected', () => {
    currentAccount = 'test';
    fixture.detectChanges();
    const buttons = element.querySelectorAll('.approve-btn');
    expect(buttons.length).toBe(2);
    expect((buttons[0] as HTMLButtonElement).disabled).toBe(false);
    expect((buttons[1] as HTMLButtonElement).disabled).toBe(false);
  });

  it('should disable receive button when ETH not earned', () => {
    currentAccount = 'test';
    component.earnedETH = '0';
    fixture.detectChanges();
    expect(
      (element.querySelector('.claim-btn') as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('should enable receive button when ETH earned', () => {
    currentAccount = 'test';
    component.earnedETH = '1';
    fixture.detectChanges();
    expect(
      (element.querySelector('.claim-btn') as HTMLButtonElement).disabled
    ).toBe(false);
  });
});
