import { waitForAngular } from 'testcafe-angular-selectors';

import {
  closeConnectionModal,
  expectOneSuccessTx,
  connectAndNavigate,
  enterRedeemLiquidPage,
} from '../utils/test-utils';

fixture`Wallet Connected: Redeem Liquid Page`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#liquid');
    await closeConnectionModal(t);
    await enterRedeemLiquidPage(t);
  });

test('redeem eth', async (t) => {
  await redeem(t, true);
});

test('redeem erc20', async (t) => {
  await redeem(t, false);
});

async function redeem(t: TestController, eth: boolean) {
  await t.typeText('#xtoken input', '0.01');
  if (eth) {
    await t.click('#eth-toggle');
  } else {
    await t.click('#erc20-toggle');
  }
  await t.click('#redeem-btn');
  await expectOneSuccessTx(t);
}
