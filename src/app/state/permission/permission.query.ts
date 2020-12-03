import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { PermissionsModel, PermissionsStore } from './permission.store';

@Injectable({ providedIn: 'root' })
export class PermissionsQuery extends Query<PermissionsModel> {
  constructor(protected store: PermissionsStore) {
    super(store);
  }

  approved(account: string, token: string, spender): boolean {
    const permission = this.store.getValue()[account];
    if (permission && permission[`${token}:${spender}`]) {
      return true;
    }
    return false;
  }
}
