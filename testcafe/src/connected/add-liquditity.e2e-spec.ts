import { waitForAngular } from 'testcafe-angular-selectors';

import {
  closeConnectionModal,
  expectOneSuccessTx,
  connectAndNavigate,
  enterAddLiquidPage,
} from '../utils/test-utils';

fixture`Wallet Connected: Add Liquid Page`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#liquid');
    await closeConnectionModal(t);
    await enterAddLiquidPage(t);
  });

test('add eth and usdt with no staking', async (t) => {
  await t.typeText('#coin1 input', '0.1');
  await t.typeText('#coin2 input', '1');
  await t.click('#add-liquid-btn');
  await expectOneSuccessTx(t);
});

test('add eth only with no staking', async (t) => {
  await t.typeText('#coin1 input', '0.1');
  await t.click('#add-liquid-btn');
  await expectOneSuccessTx(t);
});

test('add usdt only with staking', async (t) => {
  await t.typeText('#coin2 input', '1');
  await t.click('#staking-toggle');
  await t.click('#add-liquid-btn');
  await expectOneSuccessTx(t);
});
