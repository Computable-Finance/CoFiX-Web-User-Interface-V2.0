import { Injectable } from '@angular/core';

import { SettingsStore } from './settings.store';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(private store: SettingsStore) {}

  updateLang(lang: string) {
    this.store.update({ lang });
  }
}
