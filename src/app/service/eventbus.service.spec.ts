import { TestBed } from '@angular/core/testing';

import { EventBusService } from './eventbus.service';

describe('EventBusService', () => {
  let service: EventBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventBusService);
  });

  it('should work', () => {
    let result1 = '';
    let result2 = '';

    const sub1 = service.on('event1', (value) => (result1 = value));
    const sub2 = service.on('event1', (value) => (result2 = value));

    // value1
    service.emit({ name: 'event1', value: 'value1' });
    expect(result1).toBe('value1');
    expect(result2).toBe('value1');

    // value2
    service.emit({ name: 'event1', value: 'value2' });
    expect(result1).toBe('value2');
    expect(result2).toBe('value2');

    sub1.unsubscribe();
    sub2.unsubscribe();
  });
});
