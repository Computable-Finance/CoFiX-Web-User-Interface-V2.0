import 'ng-mocks/dist/jasmine';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe, MockProvider } from 'ng-mocks';
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
        MockProvider(EventBusService),
        MockProvider(Utils),
        MockProvider(TxQuery),
      ],
      declarations: [
        WalletButton,
        MockPipe(TranslatePipe),
        MockPipe(WalletAddressPipe),
      ],
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
});
