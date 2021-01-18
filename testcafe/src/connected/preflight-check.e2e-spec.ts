import { Selector } from 'testcafe';
import { waitForAngular } from 'testcafe-angular-selectors';

import {
  approveAndCheck,
  changeFromCoin,
  changeToCoin,
  closeConnectionModal,
  connectAndNavigate,
  enterAddLiquidPage,
  enterRedeemLiquidPage,
  waitToClick,
} from '../utils/test-utils';

fixture`Wallet Connected: Swap Page (preflight check)`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#swap');
  });

test('appove not needed before swapping eth -> erc20', async (t) => {
  await t.expect(Selector('#approve-btn').exists).notOk();
});

test('appove needed before swapping erc20 -> eth / erc20', async (t) => {
  // usdt -> eth
  await changeToCoin(t, '#ETH');
  await t.expect(Selector('#approve-btn').exists).ok();

  // usdt -> hbtc
  await changeToCoin(t, '#HBTC');
  await t.expect(Selector('#approve-btn').exists).ok();

  // usdt -> nest
  await changeToCoin(t, '#NEST');
  await t.expect(Selector('#approve-btn').exists).ok();

  // nest -> usdt
  await changeToCoin(t, '#USDT');
  await t.expect(Selector('#approve-btn').exists).ok();
});

test('do appove', async (t) => {
  // usdt -> eth
  await changeToCoin(t, '#ETH');
  await approveAndCheck(t);
});

test('do appove for hybrid swap', async (t) => {
  // nest -> usdt
  await changeFromCoin(t, '#NEST');
  await approveAndCheck(t);
});

fixture`Wallet Connected: Add Liquid Page (preflight check)`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#liquid');
    await closeConnectionModal(t);
    await t.click('#pair-switch');
    await enterAddLiquidPage(t);
  });

test('approve needed before adding liquid', async (t) => {
  await t.typeText('#coin2 input', '1');
  await t.expect(Selector('#approve-btn').exists).ok();
});

test('do appove', async (t) => {
  await t.typeText('#coin2 input', '1');
  await approveAndCheck(t);
});

fixture`Wallet Connected: Redeem Liquid Page (preflight check)`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#liquid');
    await closeConnectionModal(t);
    await enterRedeemLiquidPage(t);
  });

test('approve needed before redeeming liquid', async (t) => {
  await t.expect(Selector('#approve-btn').exists).ok();
});

test('do appove', async (t) => {
  await approveAndCheck(t);
});

fixture`Wallet Connected: CoFi Page (preflight check)`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#cofi');
  });

test('approve needed before claiming cofi with depositing', async (t) => {
  await t.expect(Selector('#approve-btn').exists).ok();
});

test('approve not needed before claiming cofi without depositing', async (t) => {
  await t.click('#deposit-toggle');
  await t.expect(Selector('#approve-btn').exists).notOk();
});

fixture`Wallet Connected: Dividend Page (preflight check)`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#dividend');
  });

test('approve needed before depositing cofi', async (t) => {
  await waitToClick(t, '#deposit-cofi-btn');
  await t.expect(Selector('#approve-btn').exists).ok();
});

test('do appove', async (t) => {
  await waitToClick(t, '#deposit-cofi-btn');
  await approveAndCheck(t);
});

test('approve not needed before withdrawing cofi', async (t) => {
  await waitToClick(t, '#withdraw-cofi-btn');
  await t.expect(Selector('#approve-btn').exists).notOk();
});
