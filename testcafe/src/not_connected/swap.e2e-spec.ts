import { Selector } from 'testcafe';
import { waitForAngular } from 'testcafe-angular-selectors';

import {
  changeFromCoin,
  changeToCoin,
  expectBtnsDisabled,
} from '../utils/test-utils';

fixture`Wallet Not Connected: Swap Page`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await t.navigateTo('#swap');
  });

test('oracle cost checking', async (t) => {
  // ETH -> USDT
  const oracleCost = Selector('#oracle-cost');
  await t.expect(oracleCost.innerText).eql('+0.01 ETH');

  // USDT -> ETH
  await changeToCoin(t, '#ETH');
  await t.expect(oracleCost.innerText).eql('+0.01 ETH');

  // USDT -> HBTC
  await changeToCoin(t, '#HBTC');
  await t.expect(oracleCost.innerText).eql('+0.02 ETH');

  // ETH -> NEST
  await changeFromCoin(t, '#ETH');
  await changeToCoin(t, '#NEST');
  await t.expect(oracleCost.innerText).eql('0 ETH');

  // NEST -> ETH
  await changeToCoin(t, '#ETH');
  await t.expect(oracleCost.innerText).eql('0 ETH');

  // USDT -> NEST
  await changeFromCoin(t, '#USDT');
  await changeToCoin(t, '#NEST');
  await t.expect(oracleCost.innerText).eql('+0.01 ETH');

  // NEST -> USDT
  await changeToCoin(t, '#USDT');
  await t.expect(oracleCost.innerText).eql('+0.01 ETH');

  // NEST -> COMP
  await changeToCoin(t, '#COMP');
  await t.expect(oracleCost.innerText).eql('0 ETH');
});

test('approve button checking', async (t) => {
  // ETH
  await t.expect(Selector('#approve-btn').exists).notOk();

  // HBTC
  await changeFromCoin(t, '#HBTC');
  await t.expect(Selector('#approve-btn').exists).ok();

  // NEST
  await changeFromCoin(t, '#NEST');
  await t.expect(Selector('#approve-btn').exists).ok();
});

test('swap button checking', async (t) => {
  // Not Input
  await expectBtnsDisabled(t, ['#swap-btn']);

  // Input
  await t.typeText('#from-coin input', '1');
  await t.expect(Selector('#change-price').innerText).notEql('--');
  await expectBtnsDisabled(t, ['#swap-btn']);
});

test('change price checking: ETH -> ERC20', async (t) => {
  const toCoinInput = Selector('#to-coin input');
  const changePrice = Selector('#change-price');
  await t.typeText('#from-coin input', '1');
  await t.expect(changePrice.innerText).notEql('--');
  await t.expect(toCoinInput.value).eql(await changePrice.innerText);
});

test('change price checking: ERC20 -> ETH', async (t) => {
  const toCoinInput = Selector('#to-coin input');
  const changePrice = Selector('#change-price');
  await changeFromCoin(t, '#USDT');
  await t.typeText('#from-coin input', '1');
  await t.expect(changePrice.innerText).notEql('--');
  await t.expect(toCoinInput.value).eql(await changePrice.innerText);
});

test('change price checking: ERC20 -> ERC20', async (t) => {
  const toCoinInput = Selector('#to-coin input');
  const changePrice = Selector('#change-price');
  await changeFromCoin(t, '#USDT');
  await changeToCoin(t, '#HBTC');
  await t.typeText('#from-coin input', '1');
  await t.expect(changePrice.innerText).notEql('--');
  await t.expect(toCoinInput.value).eql(await changePrice.innerText);
});

test('change price checking: ETH -> Non-CoFiX Token, Hybrid SWap', async (t) => {
  const toCoinInput = Selector('#to-coin input');
  const changePrice = Selector('#change-price');
  await changeToCoin(t, '#NEST');
  await t.typeText('#from-coin input', '1');
  await t.expect(changePrice.innerText).notEql('--');
  await t.expect(toCoinInput.value).eql(await changePrice.innerText);
});

test('change price checking: Non-CoFiX Token -> CoFiX Token, Hybrid SWap', async (t) => {
  const toCoinInput = Selector('#to-coin input');
  const changePrice = Selector('#change-price');
  await changeFromCoin(t, '#USDT');
  await changeToCoin(t, '#NEST');
  await t.typeText('#from-coin input', '1');
  await t.expect(changePrice.innerText).notEql('--');
  await t.expect(toCoinInput.value).eql(await changePrice.innerText);
});

test('change price checking: Non-CoFiX Token -> Non-CoFiX Token, Hybrid SWap', async (t) => {
  const toCoinInput = Selector('#to-coin input');
  const changePrice = Selector('#change-price');
  await changeFromCoin(t, '#NEST');
  await changeToCoin(t, '#COMP');
  await t.typeText('#from-coin input', '1');
  await t.expect(changePrice.innerText).notEql('--');
  await t.expect(toCoinInput.value).eql(await changePrice.innerText);
});

test('insufficient liquidity checking, Hybrid SWap', async (t) => {
  const errorLine = Selector('.error');
  await changeFromCoin(t, '#DAI-For-Insufficient-Testing');
  await t.typeText('#from-coin input', '1');
  await t
    .expect(errorLine.innerText)
    .contains('Insufficient liquidity for this trade.');
});
