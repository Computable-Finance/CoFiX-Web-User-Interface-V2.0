import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe, MockProvider } from 'ng-mocks';

import { TxStatusModal } from './tx-status.modal';

describe('TxStatusModal', () => {
  let component: TxStatusModal;
  let element: HTMLElement;
  let fixture: ComponentFixture<TxStatusModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [MockProvider(PopoverController)],
      declarations: [TxStatusModal, MockPipe(TranslatePipe)],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TxStatusModal);
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
});
