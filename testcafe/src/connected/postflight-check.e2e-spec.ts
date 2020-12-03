import { Selector } from 'testcafe';
import { waitForAngular } from 'testcafe-angular-selectors';

import {
  changeFromCoin,
  closeConnectionModal,
  connectAndNavigate,
  enterAddLiquidPage,
  enterRedeemLiquidPage,
  expectBtnsDisabled,
  getValueAndBalance,
  waitToClick,
} from '../utils/test-utils';

fixture`Wallet Connected: Swap Page (postflight check)`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#swap');
  });

test('eth balance - max eth amoutIn > 0.02', async (t) => {
  await t.click(`#from-coin #max-btn`);
  const result = await getValueAndBalance('#from-coin');
  await t.expect(result.balance - result.amount > 0.02).ok();
});

test('erc20 balance === max erc20 amoutIn', async (t) => {
  await changeFromCoin(t, '#USDT');
  await t.click(`#from-coin #max-btn`);
  const result = await getValueAndBalance('#from-coin');
  await t.expect(result.balance).eql(result.amount);
});

test('insufficeint balance of pool check', async (t) => {
  await t.typeText('#from-coin input', '10000');
  await t
    .expect(Selector('.error').withText('Balance of the pool:').exists)
    .ok();
  await expectBtnsDisabled(t, ['#swap-btn']);
});

fixture`Wallet Connected: Add Liquid Page (postflight check)`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#liquid');
    await closeConnectionModal(t);
    await enterAddLiquidPage(t);
  });

test('eth balance - max eth amoutIn > 0.02', async (t) => {
  await t.click(`#coin1 #max-btn`);
  const result = await getValueAndBalance('#coin1');
  await t.expect(result.balance - result.amount > 0.02).ok();
});

test('erc20 balance === max erc20 amoutIn', async (t) => {
  await t.click(`#coin2 #max-btn`);
  const result = await getValueAndBalance('#coin2');
  await t.expect(result.balance).eql(result.amount);
});

fixture`Wallet Connected: Redeem Liquid Page (postflight check)`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#liquid');
    await closeConnectionModal(t);
    await enterRedeemLiquidPage(t);
  });

test('erc20 balance === max erc20 amoutIn', async (t) => {
  await t.expect(Selector('#xtoken-balance').innerText).contains('.');
  await t.click(`#xtoken #max-btn`);
  const amount = Number(await Selector(`#xtoken input`).value);
  const balance = Number(await Selector('#xtoken-balance').innerText);
  await t.expect(amount).eql(balance);
});

test('insufficeint balance of pool check: eth', async (t) => {
  await insufficeintCheckInRedeemPage(t, true);
});

test('insufficeint balance of pool check: erc20', async (t) => {
  await insufficeintCheckInRedeemPage(t, false);
});

async function insufficeintCheckInRedeemPage(t: TestController, eth: boolean) {
  await t.typeText('#xtoken input', '10000');
  if (eth) {
    await t.click('#eth-toggle');
  } else {
    await t.click('#erc20-toggle');
  }
  await t
    .expect(Selector('.error').withText('Balance of the pool:').exists)
    .ok();
  await expectBtnsDisabled(t, ['#redeem-btn']);
}

fixture`Wallet Connected: Ming Page (postflight check)`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#liquid');
    await closeConnectionModal(t);
  });

test('max xtoken can be deposited === xtoken-balance', async (t) => {
  await waitToClick(t, '#deposit-xtoken-btn');
  await checkMaxCoinInput(t, '#xtoken-balance');
});

test('max xtoken can be withdrawed === xtoken-deposited', async (t) => {
  await waitToClick(t, '#withdraw-xtoken-btn');
  await checkMaxCoinInput(t, '#xtoken-deposited');
});

fixture`Wallet Connected: Dividend Page (postflight check)`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#dividend');
  });

test('max cofi can be deposited === cofi-balance', async (t) => {
  await waitToClick(t, '#deposit-cofi-btn');
  await checkMaxCoinInput(t, '#cofi-balance');
});

test('max cofi can be withdrawed === cofi-deposited', async (t) => {
  await waitToClick(t, '#withdraw-cofi-btn');
  await checkMaxCoinInput(t, '#cofi-deposited');
});

async function checkMaxCoinInput(t: TestController, element: string) {
  await t.expect(Selector(element).innerText).contains('.');
  await t.click(`#coin #max-btn`);
  const amount = Number(await Selector(`#coin input`).value);
  const value = Number(await Selector(element).innerText);
  await t.expect(amount).eql(value);
}
