import { Injectable } from '@angular/core';

import { PermissionsStore } from './permission.store';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  constructor(private store: PermissionsStore) {}

  updatePermission(
    account: string,
    token: string,
    spender: string,
    allowance: string = '999999999999999999999999999999999999'
  ) {
    const value = this.store.getValue();
    const permission = value[account];
    if (!permission) {
      value[account] = {};
    }
    value[account][`${token}:${spender}`] = allowance;
    this.store.update(value);
  }
}
