import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SettingsModel, SettingsStore } from './settings.store';

@Injectable({ providedIn: 'root' })
export class SettingsQuery extends Query<SettingsModel> {
  constructor(protected store: SettingsStore) {
    super(store);
  }

  lang() {
    return this.store.getValue().lang;
  }

  lang$() {
    return this.select('lang');
  }
}
