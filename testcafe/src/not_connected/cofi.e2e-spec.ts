import { Selector } from 'testcafe';
import { waitForAngular } from 'testcafe-angular-selectors';
import { expectBtnsDisabled } from '../utils/test-utils';

fixture`Wallet Not Connected: CoFi Page`
  .page('http://localhost:4200/')
  .beforeEach(async (t) => {
    await waitForAngular();
    await t.navigateTo('#cofi');
  });

test('connect modal and button checking', async (t) => {
  await t.expect(Selector('.connect-modal').exists).ok();
  await expectBtnsDisabled(t, ['#claim-cofi-btn']);
});
