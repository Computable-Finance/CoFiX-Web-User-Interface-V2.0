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

  activeTab() {
    return this.store.getValue().activeTab;
  }

  knownRisk() {
    return this.store.getValue().knownRisk;
  }

  knownRiskForAdd() {
    return this.store.getValue().knownRiskForAdd;
  }

  knownSwapRisk() {
    return this.store.getValue().knownSwapRisk;
  }

  knownSwapCofiRisk() {
    return this.store.getValue().knownSwapCofiRisk;
  }

  metamaskDisconnectedByUser() {
    return this.store.getValue().metamaskDisconnectedByUser;
  }
}
