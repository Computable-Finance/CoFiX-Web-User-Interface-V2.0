import { Selector } from 'testcafe';
import { waitForAngular } from 'testcafe-angular-selectors';
import {
  expectOneSuccessTx,
  connectAndNavigate,
  changeFromCoin,
  changeToCoin,
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

async function doSwapTesting(t: TestController, value = '0.01') {
  const changePrice = Selector('#change-price');
  await t.expect(changePrice.innerText).notEql('--');
  await t.typeText('#from-coin input', value);
  await t.click('#swap-btn');
  await expectOneSuccessTx(t);
}
