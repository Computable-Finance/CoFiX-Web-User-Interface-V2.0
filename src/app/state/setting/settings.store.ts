import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { environment } from 'src/environments/environment';

export interface SettingsModel {
  lang: string;
  activeTab: string;
  knownRisk: boolean;
  knownRiskForAdd: boolean;
  metamaskDisconnectedByUser: boolean;
  knownSwapRisk: boolean;
  knownSwapCofiRisk: boolean;
}

export function createInitialState(
  activeTab: string,
  metamaskDisconnectedByUser: boolean
): SettingsModel {
  return {
    lang: environment.lang,
    activeTab,
    knownRisk: false,
    knownRiskForAdd: false,
    metamaskDisconnectedByUser,
    knownSwapRisk: false,
    knownSwapCofiRisk: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'settings' })
export class SettingsStore extends Store<SettingsModel> {
  constructor() {
    super(createInitialState('swap', false));
  }
}
