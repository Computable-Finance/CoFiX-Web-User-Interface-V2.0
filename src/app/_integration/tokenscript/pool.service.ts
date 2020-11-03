import { Injectable } from '@angular/core';
import { BigNumber } from 'ethers';
import { Observable, of, ReplaySubject } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { TsaService as TokenService } from './base/token.service';
import { ApprovedForLiquidityPool, ApprovedForMiningPool, DepositedForMiningPool, WithdrewFromMiningPool, WithdrewFromLiquidityPool, Token } from '../types';
import { TokenProps } from './base/types';

@Injectable({
  providedIn: 'root',
})
export class PoolService {
  constructor(private token: TokenService) {}
  /**
   * @description Negotiate token it will connect with the wallet and push tokens every N seconds
   */
  public negotiateToken(): Observable<Token> {
    this.token.init();
    const files = [
      // 'assets/tokens/LiquidityPoolShare.xml',
      // 'assets/tokens/BOOKY.xml',
      // 'assets/tokens/MiningPoolShare.xml',
      // 'assets/tokens/CoFi.xml'
    ];
    for (const path of files) {
      this.token.negotiateTokenByPath(path);
    }
    return this.token.negotiateToken();
  }

  /**
   * @description Get the approved activity
   * TODO review the return types and may need to generalize this method
   */
  public getCard(
    tokenName?: string,
    instanceId?: string,
    cardName?: string,
    transactionNonce?: number,
    returnType?: string,
    cardType = 'activity'
  ): Observable<any> {
    const replay$ = new ReplaySubject<TokenProps>();
    console.log('lets render activity card');
    switch (returnType) {
      case 'ApprovedForLiquidityPool':
        this.token.renderCards({
          listener$: replay$,
          tokenName: 'LiquidityPoolShare',
          tokenInstance: 'pair=0xdAC17F958D2ee523a2206206994597C13D831ec7',
          cardName: 'sent',
          cardType,
          cardView: 'item-view',
          returnHistory: false,
          listenNewEvents: true,
          transactionNonce,
          returnType,
        });
        return replay$.asObservable().pipe(
            map(
                (item) =>
                    ({
                      transactionNonce: item.nonce,
                      transactionSender: item.from,
                      blockHeight: 0,
                      timeStamp: new Date(item.timeStamp),
                      card: item.card,
                      amount: item.value,
                      ownerAddress: item.ownerAddress,
                    } as ApprovedForLiquidityPool)
            ), tap(x => {
              console.log(`=>> LiquidityPoolShare activity card(stringified) ${JSON.stringify(x)}`);
            })
        );
        break;
    case 'ApprovedForMiningPool':
        this.token.renderCards({
            listener$: replay$,
            tokenName: 'MiningPoolShare',
            tokenInstance: 'pair=0xdAC17F958D2ee523a2206206994597C13D831ec7',
            cardName: 'sent',
            cardType,
            cardView: 'item-view',
            returnHistory: false,
            listenNewEvents: true,
            transactionNonce,
            returnType,
        });
        return replay$.asObservable().pipe(
            map(
                (item) =>
                    ({
                        transactionNonce: item.nonce,
                        transactionSender: item.from,
                        blockHeight: 0,
                        timeStamp: new Date(item.timeStamp),
                        card: item.card,
                        amount: item.value,
                        ownerAddress: item.ownerAddress,
                    } as ApprovedForMiningPool)
            ), tap(x => {
                console.log(`=>> ApprovedForMiningPool activity card(stringified) ${JSON.stringify(x)}`);
            })
        );
        break;
      case 'bokky':
        this.token.renderCards({
          listener$: replay$,
          tokenName: 'booky',
          tokenInstance: 'ownerAddress=0xcf91479f4AeC538bEc575Dc07Ecfb7f4640f4D61',
          cardName: 'received',
          cardType,
          cardView: 'item-view',
          returnHistory: true,
          listenNewEvents: true,
          transactionNonce,
          returnType,
        });
        return replay$.asObservable().pipe(
            map(
                (item) =>
                {return {
                      transactionNonce: item.nonce,
                      transactionSender: item.from,
                      blockHeight: 0,
                      timeStamp: new Date(item.timeStamp),
                      card: item.card,
                      amount: item.value,
                      ownerAddress: item.ownerAddress,
                    }; }
            ), tap(x => {
              console.log(`=>> bokky activity card(stringified): ${JSON.stringify(x)}`);
            })
        );
        break;
      default:
    }
  }

  public renderView(modal: any): any {
    return '';
  }
}
