import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidInputPage } from './liquid-input.page';

describe('PairSwitch', () => {
  let component: LiquidInputPage;
  let element: HTMLElement;
  let fixture: ComponentFixture<LiquidInputPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
      declarations: [LiquidInputPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LiquidInputPage);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should switch pair and emit an event', () => {
    spyOn(component.changeCoin, 'emit');

    component.coin = 'USDT';
    component.switch();
    expect(component.coin).toEqual('HBTC');
    expect(component.changeCoin.emit).toHaveBeenCalledWith({ coin: 'HBTC' });

    component.coin = 'HBTC';
    component.switch();
    expect(component.coin).toEqual('USDT');
    expect(component.changeCoin.emit).toHaveBeenCalledWith({ coin: 'USDT' });
  });
});
