import { Selector } from 'testcafe';
import { waitForAngular } from 'testcafe-angular-selectors';

import {
  connectAndNavigate,
  expectBtnsDisabled,
  expectOneSuccessTx,
  waitForValue,
  waitToClick,
} from '../utils/test-utils';

fixture`Wallet Connected: Dividend Page`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#dividend');
  });

test('deposit cofi', async (t) => {
  await waitToClick(t, '#deposit-cofi-btn');
  await t.typeText('#coin input', '0.01');
  await t.click('#deposit-btn');
  await expectOneSuccessTx(t);
});

test('withdraw cofi', async (t) => {
  await waitToClick(t, '#withdraw-cofi-btn');
  await t.typeText('#coin input', '0.01');
  await t.click('#withdraw-btn');
  await expectOneSuccessTx(t);
});

test('claim eth', async (t) => {
  await waitForValue(t, '#earned-eth');
  const earnedETH = Selector('#earned-eth div');
  const earned = Number(await earnedETH.innerText) > 0;
  if (earned) {
    console.log('******* earned, check tx *******');
    await t.click('#claim-eth-button');
    await expectOneSuccessTx(t);
  } else {
    console.log('*** not earned, check disable **');
    await expectBtnsDisabled(t, ['#claim-eth-button']);
  }
});
