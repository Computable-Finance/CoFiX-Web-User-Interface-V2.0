import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface MetadataModel {
  dbVersion: string;
}

export function createInitialState(): Partial<MetadataModel> {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'metadata' })
export class MetadataStore extends Store<MetadataModel> {
  constructor() {
    super(createInitialState());
  }
}
