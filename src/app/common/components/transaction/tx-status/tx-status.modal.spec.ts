import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe, MockProvider } from 'ng-mocks';

import { TxStatusPage } from './tx-status.page';

describe('TxStatusModal', () => {
  let component: TxStatusPage;
  let element: HTMLElement;
  let fixture: ComponentFixture<TxStatusPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [MockProvider(PopoverController)],
      declarations: [TxStatusPage, MockPipe(TranslatePipe)],
    }).compileComponents();

    fixture = TestBed.createComponent(TxStatusPage);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should show tx_submitted if txHash is valid', () => {
    component.txHash = 'xxxxxx';
    component.ngOnInit();
    expect(component.title).toEqual('tx_submitted');
    expect(component.desc).toEqual('tx_submitted_desc');
  });

  it('should show tx_rejected if txHash is invalid', () => {
    component.txHash = '';
    component.ngOnInit();
    expect(component.title).toEqual('tx_rejected');
    expect(component.desc).toEqual('tx_rejected_desc');
  });

  it('should go to etherscan.io if main net is used', () => {
    component.txHash = 'xxx';
    component.network = 1;
    spyOn(window, 'open');
    component.goto();
    expect(window.open).toHaveBeenCalledWith('https://etherscan.io/tx/xxx');
  });

  it('should go to ropsten.etherscan.io if ropsten net is used', () => {
    component.txHash = 'xxx';
    component.network = 3;
    spyOn(window, 'open');
    component.goto();
    expect(window.open).toHaveBeenCalledWith(
      'https://ropsten.etherscan.io/tx/xxx'
    );
  });
});
