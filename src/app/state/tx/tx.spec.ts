import { enableAkitaProdMode } from '@datorama/akita';
import { TxQuery } from './tx.query';
import { TxService } from './tx.service';
import { TxStore } from './tx.store';

describe('Tx State Management', () => {
  let store: TxStore;
  let query: TxQuery;
  let service: TxService;

  beforeAll(() => {
    enableAkitaProdMode();
  });

  beforeEach(() => {
    store = new TxStore();
    query = new TxQuery(store);
    service = new TxService(store);
  });

  it('should add tx', () => {
    service.add('tx1', 'test', 'activity1', 'network1');
    service.add('tx2', 'test', 'activity2', 'network1');
    service.add('tx3', 'test', 'activity3', 'network1');
    service.add('tx4', 'test', 'activity4', 'network1');
    service.add('tx3', 'test', 'activity1', 'network2');
    service.add('tx5', 'test1', 'activity2', 'network1');

    let pendingCount;
    const subscription1 = query
      .pendingTxCount$('test', 'network1')
      .subscribe((count) => (pendingCount = count));
    expect(pendingCount).toBe(4);
    subscription1.unsubscribe();

    let txListFromQuery;
    const subscription2 = query
      .tx$('test1', 'network1')
      .subscribe((txList) => (txListFromQuery = txList));
    expect(txListFromQuery.length).toBe(1);
    expect(txListFromQuery[0].txHash).toBe('tx5');
    expect(txListFromQuery[0].account).toBe('test1');
    expect(txListFromQuery[0].activity).toBe('activity2');
    expect(txListFromQuery[0].network).toBe('network1');
    expect(txListFromQuery[0].status).toBe('pending');
    subscription2.unsubscribe();
  });

  it('should txFailed', () => {
    service.add('tx1', 'test', 'activity1', 'network1');
    service.txFailed('tx1');

    let pendingCount;
    const subscription1 = query
      .pendingTxCount$('test', 'network1')
      .subscribe((count) => (pendingCount = count));
    expect(pendingCount).toBe(0);
    subscription1.unsubscribe();

    let txListFromQuery;
    const subscription2 = query
      .tx$('test', 'network1')
      .subscribe((txList) => (txListFromQuery = txList));
    expect(txListFromQuery.length).toBe(1);
    expect(txListFromQuery[0].status).toBe('error');
    subscription2.unsubscribe();
  });

  it('should txSucceeded', () => {
    service.add('tx1', 'test', 'activity1', 'network1');
    service.txSucceeded('tx1');

    let pendingCount;
    const subscription1 = query
      .pendingTxCount$('test', 'network1')
      .subscribe((count) => (pendingCount = count));
    expect(pendingCount).toBe(0);
    subscription1.unsubscribe();

    let txListFromQuery;
    const subscription2 = query
      .tx$('test', 'network1')
      .subscribe((txList) => (txListFromQuery = txList));
    expect(txListFromQuery.length).toBe(1);
    expect(txListFromQuery[0].status).toBe('success');
    subscription2.unsubscribe();
  });

  it('should return all txes in desc order', () => {
    service.add('tx1', 'test', 'activity1', 'network1');
    service.add('tx0', 'test', 'activity1', 'network1');
    service.add('tx2', 'test', 'activity1', 'network1');
    service.add('tx3', 'test', 'activity1', 'network1');
    service.add('tx4', 'test', 'activity1', 'network1');
    service.txSucceeded('tx1');

    let txListFromQuery;
    const subscription = query
      .tx$('test', 'network1')
      .subscribe((txList) => (txListFromQuery = txList));
    expect(txListFromQuery.length).toBe(5);
    expect(txListFromQuery[0].txHash).toBe('tx4');
    expect(txListFromQuery[1].txHash).toBe('tx3');
    expect(txListFromQuery[2].txHash).toBe('tx2');
    expect(txListFromQuery[3].txHash).toBe('tx0');
    expect(txListFromQuery[4].txHash).toBe('tx1');
    subscription.unsubscribe();
  });
});
