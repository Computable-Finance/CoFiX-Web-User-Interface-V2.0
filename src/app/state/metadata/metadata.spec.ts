import { enableAkitaProdMode } from '@datorama/akita';
import { MetadataQuery } from './metadata.query';
import { MetadataService } from './metadata.service';
import { MetadataStore } from './metadata.store';

describe('Metadata State Management', () => {
  let store: MetadataStore;
  let query: MetadataQuery;
  let service: MetadataService;

  beforeAll(() => {
    enableAkitaProdMode();
  });

  beforeEach(() => {
    store = new MetadataStore();
    query = new MetadataQuery(store);
    service = new MetadataService(store);
  });

  it('should update dbVersion', () => {
    service.updateDbVersion('1234');
    expect(query.dbVersion()).toEqual('1234');
  });
});
