import { Selector } from 'testcafe';
import { waitForAngular } from 'testcafe-angular-selectors';

import {
  closeConnectionModal,
  expectOneSuccessTx,
  connectAndNavigate,
  waitToClick,
  approveAndCheck,
} from '../utils/test-utils';

fixture`Wallet Connected: Ming Page`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#liquid');
    await closeConnectionModal(t);
  });

test('approve needed before depositing', async (t) => {
  await waitToClick(t, '#deposit-xtoken-btn');
  await t.expect(Selector('#approve-btn').exists).ok();
});

test('do approve for depositing', async (t) => {
  await waitToClick(t, '#deposit-xtoken-btn');
  await approveAndCheck(t);
});

test('deposit', async (t) => {
  await waitToClick(t, '#deposit-xtoken-btn');
  await t.typeText('#coin input', '0.01');
  await t.click('#deposit-btn');
  await expectOneSuccessTx(t);
});

test('approve not needed before withdrawing', async (t) => {
  await waitToClick(t, '#withdraw-xtoken-btn');
  await t.expect(Selector('#approve-btn').exists).notOk();
});

test('withdraw', async (t) => {
  await waitToClick(t, '#withdraw-xtoken-btn');
  await t.typeText('#coin input', '0.001');
  await t.click('#withdraw-btn');
  await expectOneSuccessTx(t);
});
