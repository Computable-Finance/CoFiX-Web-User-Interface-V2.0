import { Injectable } from '@angular/core';

import { createInitialState, SettingsStore } from './settings.store';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(private store: SettingsStore) {}

  updateLang(lang: string) {
    this.store.update({ lang });
  }

  updateActiveTab(tab: string) {
    this.store.update({ activeTab: tab });
  }

  updateKnownRisk(knownRisk: boolean) {
    this.store.update({ knownRisk });
  }

  updateKnownRiskForAdd(knownRiskForAdd: boolean) {
    this.store.update({ knownRiskForAdd });
  }

  updateMetamaskDisconnectedByUser(metamaskDisconnectedByUser: boolean) {
    this.store.update({ metamaskDisconnectedByUser });
  }

  reset() {
    this.store.update(
      createInitialState(
        this.store.getValue().activeTab,
        this.store.getValue().metamaskDisconnectedByUser
      )
    );
  }
}
