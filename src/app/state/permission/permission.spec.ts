import { enableAkitaProdMode } from '@datorama/akita';
import { PermissionsQuery } from './permission.query';
import { PermissionsService } from './permission.service';
import { PermissionsStore } from './permission.store';

describe('Permission State Management', () => {
  let store: PermissionsStore;
  let query: PermissionsQuery;
  let service: PermissionsService;

  beforeAll(() => {
    enableAkitaProdMode();
  });

  beforeEach(() => {
    store = new PermissionsStore();
    query = new PermissionsQuery(store);
    service = new PermissionsService(store);
  });

  it('should updatePermission', () => {
    service.updatePermission('test', 'testCoin', 'spender');
    expect(query.approved('test', 'testCoin', 'spender')).toBe(true);
  });

  it('should return false when spender not approved', () => {
    expect(query.approved('test', 'testCoin', 'spender')).toBe(false);
  });
});
