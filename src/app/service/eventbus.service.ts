import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class EventData {
  name: string;
  value: any;
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private subject$ = new Subject();

  constructor() {}

  emit(event: Partial<EventData>) {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$
      .pipe(
        filter((e: EventData) => e.name === eventName),
        map((e: EventData) => e.value)
      )
      .subscribe(action);
  }
}
