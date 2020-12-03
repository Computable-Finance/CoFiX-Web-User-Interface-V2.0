import { enableAkitaProdMode } from '@datorama/akita';
import { SettingsQuery } from './settings.query';
import { SettingsService } from './settings.service';
import { createInitialState, SettingsStore } from './settings.store';

describe('Settings State Management', () => {
  let store: SettingsStore;
  let query: SettingsQuery;
  let service: SettingsService;

  beforeAll(() => {
    enableAkitaProdMode();
  });

  beforeEach(() => {
    store = new SettingsStore();
    query = new SettingsQuery(store);
    service = new SettingsService(store);
  });

  it('should updateLang', () => {
    let langFromQuery;
    service.updateLang('zh');
    const subscription = query
      .lang$()
      .subscribe((lang) => (langFromQuery = lang));

    expect(langFromQuery).toEqual('zh');
    expect(query.lang()).toEqual('zh');

    subscription.unsubscribe();
  });

  it('should updateActiveTab', () => {
    service.updateActiveTab('cofi');
    expect(query.activeTab()).toEqual('cofi');
  });

  it('should updateKnownRisk', () => {
    service.updateKnownRisk(true);
    expect(query.knownRisk()).toEqual(true);
  });

  it('should updateKnownRiskForAdd', () => {
    service.updateKnownRiskForAdd(true);
    expect(query.knownRiskForAdd()).toEqual(true);
  });

  it('should reset with active tab', () => {
    service.updateActiveTab('cofi');
    const initialState = createInitialState('cofi');
    service.reset();
    expect(JSON.stringify(store.getValue())).toEqual(
      JSON.stringify(initialState)
    );
  });
});
