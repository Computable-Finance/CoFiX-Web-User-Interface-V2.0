import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Activity, Token } from '../types';
import { FakeDataService } from './fake-data.service';
import { uuidv4 } from './utility';

@Injectable({
  providedIn: 'root',
})

/**
 * ! This is the example how to make a push-based (reactive) service
 * ! currently returns fake data
 */
export class FakePoolService {
  constructor(private fakeData: FakeDataService) {}
  /**
   * @description Negotiate token it will connect with the wallet and push tokens every N seconds
   * @returns dummy data
   */
  public negotiateToken(): Observable<Token> {
    const tokenGenerator$ = new BehaviorSubject<any>(
      this.fakeData.generateToken()
    );
    setInterval((x) => {
      tokenGenerator$.next(this.fakeData.generateToken());
    }, 5000);

    return tokenGenerator$.asObservable();
  }

  /**
   * @description Currently just producing a random uuid
   * @returns dummy data
   */
  // TODO: change that to return just a string, not an 'Observable<string>'
  // TODO contract 20 bytes, payload unlimited bytes
  public createTransaction(
    contract: string,
    payload: string
  ): Observable<string> {
    const transactionId = uuidv4();
    return of(transactionId).pipe(delay(5000));
  }

  /**
   * @description Get the approved activity
   * @returns dummy data
   */
  public getCard<T extends Activity>(
    tokenName: string,
    instanceId: string,
    cardName: string,
    transactionNonce: number,
    returnType: string,
    activityCardType = 'activity'
  ): Observable<T> {
    // call a blockchain => bootstrap.js
    return of(
      this.fakeData.generateApprovedActivity<T>(transactionNonce, returnType)
    );
  }

  public renderView(modal: any): any {
    return '';
  }
}
