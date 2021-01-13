import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe, MockProvider } from 'ng-mocks';
import { TOKENS } from 'src/app/common/constants';
import { MarkedPipe } from 'src/app/common/pipes/marked.pipe';
import { CofiXService } from 'src/app/service/cofix.service';

import { CoinSelector } from './coin-selector';

describe('CoinSelector', () => {
  let component: CoinSelector;
  let element: HTMLElement;
  let fixture: ComponentFixture<CoinSelector>;
  let coinSelected: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(ModalController, {
          dismiss: (coin) => (coinSelected = coin),
        }),
        MockProvider(CofiXService),
      ],
      declarations: [
        CoinSelector,
        MockPipe(TranslatePipe),
        MockPipe(MarkedPipe),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinSelector);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  // it('should show all tokens', () => {
  //   fixture.detectChanges();
  //   expect(element.querySelectorAll('.coin_icon').length).toEqual(
  //     TOKENS.length
  //   );
  // });

  // it('should select a coin', () => {
  //   component.selectCoin('USDT');
  //   expect(coinSelected).toEqual('USDT');
  // });

  it('should select no coin when closed directly', () => {
    component.close();
    expect(coinSelected).toBeUndefined();
  });

  // it('should show two tokens when queryToken equals h  ', () => {
  //   component.queryToken = 'h';
  //   component.searchToken(undefined);
  //   fixture.detectChanges();
  //   expect(element.querySelectorAll('.coin_icon').length).toEqual(2);
  //   expect(element.querySelectorAll('.coin_icon').length).toEqual(
  //     component.coinList.length
  //   );
  // });
});
