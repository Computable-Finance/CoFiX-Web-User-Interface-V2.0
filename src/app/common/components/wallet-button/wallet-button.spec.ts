import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe, MockProvider, MockService } from 'ng-mocks';
import { CofiXService } from 'src/app/service/cofix.service';
import { EventBusService } from 'src/app/service/eventbus.service';
import { TxQuery } from 'src/app/state/tx/tx.query';

import { WalletAddressPipe } from '../../pipes/wallet-address.pipe';
import { Utils } from '../../utils';
import { WalletButton } from './wallet-button';

describe('WalletButton', () => {
  let component: WalletButton;
  let element: HTMLElement;
  let fixture: ComponentFixture<WalletButton>;

  let currentAccount: string;
  let currentNetwork: string;

  const emitSpy = jasmine.createSpy();
  const getPairAttendedSpy = jasmine.createSpy();

  beforeEach(() => {
    currentAccount = '';
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(PopoverController),
        MockProvider(CofiXService, {
          getCurrentAccount: () => {
            return currentAccount;
          },
          getCurrentNetwork: () => {
            return currentNetwork;
          },
          connectWallet: () => {
            return Promise.resolve();
          },
        }),
        MockProvider(EventBusService, {
          emit: emitSpy,
        }),
        MockProvider(Utils, {
          getPairAttended: getPairAttendedSpy,
        }),
        MockProvider(TxQuery),
      ],
      declarations: [
        WalletButton,
        MockPipe(TranslatePipe),
        MockPipe(WalletAddressPipe),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletButton);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should show connect button and no loading div when not connected', () => {
    fixture.detectChanges();
    const spanInDiv = element.querySelector('div > span');
    expect(spanInDiv).not.toBeNull();
    const loadingDiv = element.querySelector('.loading-connect');
    expect(loadingDiv).toBeNull();
  });

  it('should show loading div when connecting', () => {
    component.isConnectLoading = true;
    fixture.detectChanges();
    const loadingDiv = element.querySelector('.loading-connect');
    expect(loadingDiv).not.toBeNull();
  });

  it('should show pending div before tx is confirmed', () => {
    component.pendingCount = 2;
    fixture.detectChanges();
    const pendingDiv = element.querySelector('.tx-pending');
    expect(pendingDiv).not.toBeNull();
  });

  it('should not show pending div when no tx is running', () => {
    component.pendingCount = 0;
    fixture.detectChanges();
    const pendingDiv = element.querySelector('.tx-pending');
    expect(pendingDiv).toBeNull();
  });

  it('should do some checing and emit connected event when connected', fakeAsync(() => {
    component.isConnectLoading = true;
    component.connect();
    tick(1000);
    expect(emitSpy).toHaveBeenCalledWith({ name: 'wallet_connected' });
    expect(getPairAttendedSpy).toHaveBeenCalled();
    expect(component.isConnectLoading).toEqual(false);
  }));
});
