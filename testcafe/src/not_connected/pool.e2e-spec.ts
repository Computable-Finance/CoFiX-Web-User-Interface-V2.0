import { Selector } from 'testcafe';
import { waitForAngular } from 'testcafe-angular-selectors';
import { expectBtnsDisabled } from '../utils/test-utils';

fixture`Wallet Not Connected: Pool Page`
  .page(`http://localhost:4200/`)
  .beforeEach(async (t) => {
    await waitForAngular();
    await t.navigateTo('#liquid');
  });

test('connect modal and button checking', async (t) => {
  await t.expect(Selector('.connect-btn').exists).ok();
  await expectBtnsDisabled(t, [
    '#enter-liquid-btn',
    '#withdraw-liquid-btn',
    '#deposit-xtoken-btn',
    '#withdraw-xtoken-btn',
  ]);
});
