import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MockPipe, MockProvider } from 'ng-mocks';
import { from } from 'rxjs';
import { WalletAddressPipe } from 'src/app/common/pipes/wallet-address.pipe';
import { CofiXService } from 'src/app/service/cofix.service';
import { TxQuery } from 'src/app/state/tx/tx.query';
import { TxDetails } from 'src/app/state/tx/tx.store';

import { TxListPage } from './tx-list.page';

describe('TxHistoryModal', () => {
  let component: TxListPage;
  let element: HTMLElement;
  let fixture: ComponentFixture<TxListPage>;
  let txDetails: [TxDetails[]];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(PopoverController),
        MockProvider(TxQuery, {
          tx$: () => from(txDetails),
        }),
        MockProvider(CofiXService),
        MockProvider(TranslateService, {
          get: () => from('test'),
        }),
      ],
      declarations: [
        TxListPage,
        MockPipe(TranslatePipe),
        MockPipe(WalletAddressPipe),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TxListPage);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should show all items in txList', () => {
    txDetails = [
      [
        {
          txHash: 'string',
          account: 'string',
          activity: '[]',
          network: 'string',
          status: 'success',
        },
        {
          txHash: 'string',
          account: 'string',
          activity: '[]',
          network: 'string',
          status: 'success',
        },
        {
          txHash: 'string',
          account: 'string',
          activity: '[]',
          network: 'string',
          status: 'success',
        },
        {
          txHash: 'string',
          account: 'string',
          activity: '[]',
          network: 'string',
          status: 'success',
        },
        {
          txHash: 'string',
          account: 'string',
          activity: '[]',
          network: 'string',
          status: 'success',
        },
      ],
    ];

    fixture.detectChanges();
    expect(element.querySelectorAll('.tx').length).toEqual(
      component.txList.length
    );
  });

  it('should show pending if a pending tx existing', () => {
    txDetails = [
      [
        {
          txHash: 'string',
          account: 'string',
          activity: '[]',
          network: 'string',
          status: 'pending',
        },
      ],
    ];
    fixture.detectChanges();
    expect(element.querySelectorAll('.tx-pending').length).toEqual(1);
  });

  it('should show success if a success tx existing', () => {
    txDetails = [
      [
        {
          txHash: 'string',
          account: 'string',
          activity: '[]',
          network: 'string',
          status: 'success',
        },
      ],
    ];
    fixture.detectChanges();
    expect(
      element.querySelectorAll('img[src="./assets/images/tx-success.png"]')
        .length
    ).toEqual(1);
  });

  it('should show error if an error tx existing', () => {
    txDetails = [
      [
        {
          txHash: 'string',
          account: 'string',
          activity: '[]',
          network: 'string',
          status: 'error',
        },
      ],
    ];
    fixture.detectChanges();
    expect(
      element.querySelectorAll('img[src="./assets/images/tx-error.png"]').length
    ).toEqual(1);
  });
});
