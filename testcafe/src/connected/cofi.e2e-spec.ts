import { waitForAngular } from 'testcafe-angular-selectors';

import {
  connectAndNavigate,
  expectOneSuccessTx,
  waitToClick,
} from '../utils/test-utils';

fixture`Wallet Connected: CoFi Page`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await connectAndNavigate(t, '#cofi');
    await waitToClick(t, '#claim-cofi-btn');
  });

test('claim with depositing', async (t) => {
  await expectOneSuccessTx(t);
});

test('claim without depositing', async (t) => {
  await t.click('#deposit-toggle');
  await expectOneSuccessTx(t);
});
