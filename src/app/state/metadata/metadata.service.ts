import { Injectable } from '@angular/core';

import { MetadataStore } from './metadata.store';

@Injectable({ providedIn: 'root' })
export class MetadataService {
  constructor(private store: MetadataStore) {}

  updateDbVersion(dbVersion: string) {
    this.store.update({ dbVersion });
  }
}
