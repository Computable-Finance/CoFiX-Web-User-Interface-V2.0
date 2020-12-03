import { Selector } from 'testcafe';

export async function expectOneSuccessTx(t: TestController) {
  // pending
  await t.expect(Selector('.close-btn').exists).ok();
  await t.expect(Selector('.loading').exists).ok();
  await t.expect(Selector('.tx-pending').exists).ok();
  await t.expect(Selector('.tx-pending').withText('1 Pending').exists).ok();

  await t.click('.close-btn');

  // ended
  await t.expect(Selector('.tx-pending').exists).notOk();
  await t.click('.wallet_show');
  await t.expect(Selector('.tx').count).eql(1);
}

export async function connectAndNavigate(t: TestController, url: string) {
  await t.click('.wallet_show');
  await t.navigateTo(url);
}

export async function closeConnectionModal(t: TestController) {
  await t.click('#close-warning-btn');
}

export async function changeFromCoin(t: TestController, coin: string) {
  await t.click('#from-coin .coin_icon');
  await t.click(coin);
}

export async function changeToCoin(t: TestController, coin: string) {
  await t.click('#to-coin .coin_icon');
  await t.click(coin);
}

export async function expectBtnsDisabled(t: TestController, btns: string[]) {
  for (const btn of btns) {
    await t.expect(Selector(btn).hasAttribute('disabled')).ok();
  }
}

export async function waitToClick(t: TestController, btn: string) {
  await t.expect(Selector(btn).hasAttribute('disabled')).notOk();
  await t.click(btn);
}

export async function waitForValue(t: TestController, element: string) {
  const skeleton = Selector(element + ' ion-skeleton-text');
  await t.expect(skeleton.exists).ok();
  await t.expect(skeleton.exists).notOk();
}

export async function getValueAndBalance(element: string) {
  const amount = Number(await Selector(`${element} input`).value);
  const balance = Number(await Selector(`${element} #balance`).innerText);
  return {
    amount,
    balance,
  };
}

export async function enterAddLiquidPage(t: TestController) {
  await waitToClick(t, '#enter-liquid-btn');
  await closeConnectionModal(t);
}

export async function enterRedeemLiquidPage(t: TestController) {
  await waitToClick(t, '#withdraw-liquid-btn');
}

export async function approveAndCheck(t: TestController) {
  await t.expect(Selector('#approve-btn').exists).ok();
  await t.click('#approve-btn');
  await expectOneSuccessTx(t);
}
