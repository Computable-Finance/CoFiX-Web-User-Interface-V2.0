import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe, MockProvider } from 'ng-mocks';
import { TOKENS } from 'src/app/common/constants';

import { CoinSelectPage } from './coin-select.page';

describe('CoinSelector', () => {
  let component: CoinSelectPage;
  let element: HTMLElement;
  let fixture: ComponentFixture<CoinSelectPage>;
  let coinSelected: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockProvider(ModalController, {
          dismiss: (coin) => (coinSelected = coin),
        }),
      ],
      declarations: [CoinSelectPage, MockPipe(TranslatePipe)],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinSelectPage);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should show all tokens', () => {
    fixture.detectChanges();
    expect(element.querySelectorAll('.coin_icon').length).toEqual(
      TOKENS.length
    );
  });

  it('should select a coin', () => {
    component.selectCoin('USDT');
    expect(coinSelected).toEqual('USDT');
  });

  it('should select no coin when closed directly', () => {
    component.close();
    expect(coinSelected).toBeUndefined();
  });
});
