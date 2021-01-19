import { Selector } from 'testcafe';
import { waitForAngular } from 'testcafe-angular-selectors';

import {
  changeFromCoin,
  changeToCoin,
  connectAndNavigate,
  expectOneSuccessTx,
  waitToClick,
} from '../utils/test-utils';

fixture`Wallet Connected: Swap Page`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#swap');
  });

test('swap eth -> erc20', async (t) => {
  await doSwapTesting(t);
});

test('swap erc20 -> eth', async (t) => {
  await changeFromCoin(t, '#USDT');
  await doSwapTesting(t, '1');
});

test('swap erc20 -> erc20', async (t) => {
  await changeFromCoin(t, '#USDT');
  await changeToCoin(t, '#HBTC');
  await doSwapTesting(t);
});

test('swap eth -> non-cofix token, hybrid swap', async (t) => {
  await changeToCoin(t, '#NEST');
  await doSwapTesting(t);
});

test('swap non-cofix token -> eth, hybrid swap', async (t) => {
  await changeFromCoin(t, '#NEST');
  await changeToCoin(t, '#ETH');
  await doSwapTesting(t, '0.01');
});

test('swap cofix token -> non-cofix token, hybrid swap ', async (t) => {
  await changeFromCoin(t, '#USDT');
  await changeToCoin(t, '#NEST');
  await doSwapTesting(t);
});

test('swap non-cofix token -> cofix token, hybrid swap ', async (t) => {
  await changeFromCoin(t, '#NEST');
  await doSwapTesting(t, '1');
});

test('swap non-cofix token -> non-cofix token, hybrid swap ', async (t) => {
  await changeFromCoin(t, '#NEST');
  await changeToCoin(t, '#COMP');
  await doSwapTesting(t, '1');
});

async function doSwapTesting(t: TestController, value = '0.01') {
  const changePrice = Selector('#change-price');
  await t.expect(changePrice.innerText).notEql('--');
  await t.typeText('#from-coin input', value);
  await t.wait(1500);
  await waitToClick(t, '#swap-btn');
  await expectOneSuccessTx(t);
}
