import { Injectable } from '@angular/core';
import { BigNumber } from 'ethers';
import { Observable, of, ReplaySubject } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { uuidv4 } from './fake/utility';
import { TsaService } from './tokenscript/tsa.service';
import { ApprovedForLiquidityPool, Token, TokenProps } from './types';

@Injectable({
  providedIn: 'root',
})
export class PoolService {
  constructor(private tsa: TsaService) {}
  /**
   * @description Negotiate token it will connect with the wallet and push tokens every N seconds
   * @returns dummy data
   */
  public negotiateToken(): Observable<Token> {
    this.tsa.init();
    const files = [
      // 'assets/LiquidityPoolShare.xml',
      'assets/BOOKY.xml',
      // 'assets/MiningPoolShare.xml',
      // 'assets/COFI.xml'
    ];
    for (const path of files) {
      this.tsa.negotiateTokenByPath(path);
    }
    return this.tsa.negotiateToken();
  }

  /**
   * @description Currently just producing a random uuid
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
  public getCard(
    tokenName?: string,
    instanceId?: string,
    cardName?: string,
    transactionNonce?: number,
    returnType?: string,
    activityCardType = 'activity'
  ): Observable<any> {
    // call a blockchain => bootstrap.js
    // return of(
    //   this.tsa.<T>(transactionNonce, returnType)
    // );
    const replay$ = new ReplaySubject<TokenProps>();
    if (returnType === 'ApprovedForLiquidityPool') {
      console.log('lets render activity card');
      this.tsa.renderCards({
        listener$: replay$,
        // tokenName: 'LiquidityPoolShare',
        tokenName: 'booky',
        // tokenInstance: 'pair=0xdAC17F958D2ee523a2206206994597C13D831ec7',
        // tokenInstance: 'ownerAddress=0xcf91479f4AeC538bEc575Dc07Ecfb7f4640f4D61',
        tokenInstance: 'ownerAddress=',
        // cardName: 'sent',
        cardName: 'received',
        cardType: 'activity',
        cardView: 'item-view',
        // returnHistory: false,
        returnHistory: true,
        listenNewEvents: true,
        transactionNonce,
        returnType,
      });
    }
    
    return replay$.asObservable().pipe(
      map(
        (item) =>
          ({
            transactionNonce: item.nonce,
            transactionSender: '',
            blockHeight: 0,
            timeStamp: new Date('October 25, 2020 23:59:59'),
            card: item.card,
            amount: BigNumber.from(0),
            ownerAddress: item.ownerAddress,
          } as ApprovedForLiquidityPool)
      ), tap(x => {
        console.log(`aaaaaaaaaaaaa ${JSON.stringify(x)}`);
      })
    );
  }

  public renderView(modal: any): any {
    return '';
  }
}
