import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MetadataModel, MetadataStore } from './metadata.store';

@Injectable({ providedIn: 'root' })
export class MetadataQuery extends Query<MetadataModel> {
  constructor(protected store: MetadataStore) {
    super(store);
  }

  dbVersion() {
    return this.store.getValue().dbVersion;
  }
}
