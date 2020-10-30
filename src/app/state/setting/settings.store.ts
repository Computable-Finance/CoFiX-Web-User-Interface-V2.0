import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SettingsModel {
  lang: string;
}

export function createInitialState(): SettingsModel {
  return {
    lang: 'en',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'settings' })
export class SettingsStore extends Store<SettingsModel> {
  constructor() {
    super(createInitialState());
  }
}
