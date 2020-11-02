import { Injectable } from '@angular/core';
import { ShareStateQuery } from './share.query';
import { ShareStateStore, ShareState, createInitialState } from './share.store';

@Injectable({ providedIn: 'root' })
export class ShareStateService {
  constructor(
    private shareStore: ShareStateStore,
    private shareStateQuery: ShareStateQuery
  ) {}

  updateActiveTab(tab: string) {
    this.shareStore.update({ activeTab: tab });
  }

  updateShareStore(shareState: ShareState) {
    this.shareStore.update(shareState);
  }

  updatePairAttended(pairAttended: any) {
    this.shareStore.update({ pairAttended });
  }

  updateLang(lang: string) {
    this.shareStore.update({ lang });
  }

  updateKnownRisk(knownRisk: boolean) {
    this.shareStore.update({ knownRisk });
  }

  updateKnownRiskForAdd(knownRiskForAdd: boolean) {
    this.shareStore.update({ knownRiskForAdd });
  }

  reset() {
    this.shareStore.update(
      createInitialState(this.shareStateQuery.getValue().activeTab)
    );
  }
}
