import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { MockDirective, MockPipe, MockProvider } from 'ng-mocks';
import { TOKENS } from 'src/app/common/constants';
import { SkeletonDirective } from 'src/app/common/directive/skeleton/skeleton';
import { BalanceTruncatePipe } from 'src/app/common/pipes/balance.pipe';
import { MarkedPipe } from 'src/app/common/pipes/marked.pipe';
import { WalletAddressPipe } from 'src/app/common/pipes/wallet-address.pipe';
import { CofiXService } from 'src/app/service/cofix.service';
import { EventBusService } from 'src/app/service/eventbus.service';

import { CoinSelector } from './coin-selector';

describe('CoinSelector', () => {
  let component: CoinSelector;
  let element: HTMLElement;
  let fixture: ComponentFixture<CoinSelector>;
  let coinSelected: string;
  let currentAccount: string;
  let currentNetwork: number = 3;
  let newToken = {
    chainId: 3,
    address: '0x200506568C2980B4943B5EaA8713A5740eb2c98A',
    name: 'Tether',
    symbol: 'USDT',
    decimals: 6,
    logoURI:
      'https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707',
    id: `${currentNetwork}-0x200506568C2980B4943B5EaA8713A5740eb2c98A`,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(ModalController, {
          dismiss: (coin) => (coinSelected = coin),
        }),
        MockProvider(CofiXService, {
          getCurrentAccount: () => {
            return currentAccount;
          },
          getCurrentNetwork: () => {
            return currentNetwork;
          },
          loadToken: (address: string) => {
            return Promise.resolve(newToken);
          },
          connectWallet: () => {
            return Promise.resolve();
          },
        }),
        MockProvider(NavParams),
        MockProvider(EventBusService),
        MockProvider(BalanceTruncatePipe),
      ],
      declarations: [
        CoinSelector,
        MockPipe(TranslatePipe),
        MockPipe(MarkedPipe),
        MockPipe(BalanceTruncatePipe),
        MockDirective(SkeletonDirective),
        MockPipe(WalletAddressPipe),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinSelector);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should show all tokens', () => {
    fixture.detectChanges();
    expect(element.querySelectorAll('.coin_icon').length).toEqual(1);
  });

  it('should select a coin', () => {
    component.selectCoin(
      { srcElement: { id: null } },
      {
        chainId: 3,
        address: '0x200506568C2980B4943B5EaA8713A5740eb2c98A',
        name: 'Tether',
        symbol: 'USDT',
        decimals: 6,
        logoURI:
          'https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707',
      }
    );
    expect(coinSelected).toEqual('USDT');
  });

  it('should select no coin when closed directly', () => {
    component.close();
    expect(coinSelected).toBeUndefined();
  });

  it('should show two tokens when queryToken equals h  ', () => {
    component.queryToken = 'h';
    component.searchToken(undefined);
    fixture.detectChanges();
    expect(element.querySelectorAll('.coin_icon').length).toEqual(1);
    expect(element.querySelectorAll('.coin_icon').length).toEqual(
      component.coinList.length
    );
  });

  it('should show two tokens when queryToken equals n  ', () => {
    component.queryToken = 'n';
    component.searchToken(undefined);
    fixture.detectChanges();
    expect(element.querySelectorAll('.coin_icon').length).toEqual(0);
    expect(element.querySelectorAll('.coin_icon').length).toEqual(
      component.coinList.length
    );
  });

  it('add coin by address', async () => {
    component.queryToken = '0x200506568C2980B4943B5EaA8713A5740eb2c98A';
    await component.searchToken(undefined);
    fixture.detectChanges();
    expect(element.querySelectorAll('.coin_icon').length).toEqual(1);
    expect(element.querySelectorAll('#remove').length).toEqual(1);
  });
});
