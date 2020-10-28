import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

type Allowance = string;

// key = $token:$spender
export interface Permission {
  [key: string]: Allowance;
}

// key = account
export interface PermissionsModel {
  [key: string]: Partial<Permission>;
}

export function createInitialState(): PermissionsModel {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'permissions' })
export class PermissionsStore extends Store<PermissionsModel> {
  constructor() {
    super(createInitialState());
  }
}
