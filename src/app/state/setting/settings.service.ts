import { Injectable } from '@angular/core';
import { SettingsQuery } from './settings.query';

import { createInitialState, SettingsStore } from './settings.store';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(private store: SettingsStore, private query: SettingsQuery) {}

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

  reset() {
    this.store.update(createInitialState(this.query.getValue().activeTab));
  }
}
