import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { MockPipe, MockProvider } from 'ng-mocks';
import { TOKENS } from 'src/app/common/constants';

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
      ],
      declarations: [CoinSelector, MockPipe(TranslatePipe)],
    }).compileComponents();

    fixture = TestBed.createComponent(CoinSelector);
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
