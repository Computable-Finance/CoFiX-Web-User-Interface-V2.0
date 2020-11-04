import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ApprovedForLiquidityPool, ApprovedForMiningPool, Token, LiquidityPoolShare, MiningPoolShare, DividendPoolShare, CoFi, DepositedForMiningPool, WithdrewFromMiningPool, WithdrewFromLiquidityPool } from '../types';
import { TokenService } from './base/token.service';
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
      'assets/tokens/LiquidityPoolShare.xml',
    //   'assets/tokens/BOOKY.xml',
      'assets/tokens/MiningPoolShare.xml',
      'assets/tokens/CoFi.xml'
    ];
    for (const path of files) {
      this.token.negotiateTokenByPath(path);
    }

    // return this.token.negotiateToken().pipe(map(x => x));
    return this.token.negotiateToken().pipe(
    map(x => {
        const output = {} as Token;
        if (!x) {
            return x;
        }
        Object.keys(x).forEach(tokenName => {
            output[tokenName] = {};
            const instances = x[tokenName];
            Object.keys(instances).forEach(instanceId => {
                const tokenInstance = x[tokenName][instanceId];
                switch (tokenName) {
                    case 'LiquidityPoolShare':
                        output[tokenName][instanceId] = {
                            pairSymbol: tokenInstance.pairSymbol,
                            pair: tokenInstance.pair,
                            balance: tokenInstance.balance,
                            pairedTokenAllowance: tokenInstance.pairedTokenAllowance,
                            totalSupply: tokenInstance.totalSupply,
                            navPerShare: tokenInstance.navPerShare,
                            navPerShareSubscription:
                            tokenInstance.navPerShareSubscription,
                            navPerShareRedemption: tokenInstance.navPerShareRedemption,
                        } as LiquidityPoolShare;
                        break;
                    case 'MiningPoolShare':
                        output[tokenName][instanceId] = {
                            pairSymbol: tokenInstance.pairSymbol,
                            pair: tokenInstance.pair,
                            balance: tokenInstance.balance,
                            poolSize: tokenInstance.poolSize,
                            miningAllowance: tokenInstance.miningAllowance,
                            cofiMiningRate: tokenInstance.cofiMiningRate,
                            cofiReceivable: tokenInstance.cofiReceivable,
                        } as MiningPoolShare;
                        break;
                    case 'DividendPoolShare':
                        output[tokenName][instanceId] = {
                            balance: tokenInstance.balance,
                            cofiAllowance: tokenInstance.cofiAllowance,
                            poolSize: tokenInstance.poolSize,
                            poolEthBalance: tokenInstance.poolEthBalance,
                            dividendPayoutRatio: tokenInstance.dividendPayoutRatio,
                            dividendReceivable: tokenInstance.dividendReceivable,
                        } as DividendPoolShare;
                        break;
                    case 'CoFi':
                        output[tokenName][instanceId] = {
                            balance: tokenInstance.balance,
                            totalSupply: tokenInstance.totalSupply,
                        } as CoFi;
                        break;
                    default:
                        output[tokenName] = x[tokenName];
                }
            });
        });
        return output;
    }) );
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
      const outputObservable = replay$.asObservable().pipe(filter(x => transactionNonce === x.nonce));
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
              return outputObservable.pipe(
                  map(
                      (item) =>
                          ({
                              transactionNonce: item.nonce,
                              transactionSender: item.from,
                              blockHeight: item.blockNumber,
                              timeStamp: new Date(item.timeStamp * 1000),
                              card: item.card,
                              amount: item.value,
                              ownerAddress: item.ownerAddress,
                          } as ApprovedForLiquidityPool)
                  )
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
              return outputObservable.pipe(
                  map(
                      (item) =>
                          ({
                              transactionNonce: item.nonce,
                              transactionSender: item.from,
                              blockHeight: item.blockNumber,
                              timeStamp: new Date(item.timeStamp * 1000),
                              card: item.card,
                              amount: item.value,
                              ownerAddress: item.ownerAddress,
                          } as ApprovedForMiningPool)
                  )
              );
              break;
          case 'DepositedForMiningPool':
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
              return outputObservable.pipe(
                  map(
                      (item) =>
                          ({
                              transactionNonce: item.nonce,
                              transactionSender: item.from,
                              blockHeight: item.blockNumber,
                              timeStamp: new Date(item.timeStamp * 1000),
                              card: item.card,
                              amount: item.value,
                              depositorAddress: item.ownerAddress,
                          } as DepositedForMiningPool)
                  )
              );
              break;
          case 'WithdrewFromMiningPool':
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
              return outputObservable.pipe(
                  map(
                      (item) =>
                          ({
                              transactionNonce: item.nonce,
                              transactionSender: item.from,
                              blockHeight: item.blockNumber,
                              timeStamp: new Date(item.timeStamp * 1000),
                              card: item.card,
                              amount: item.value,
                              ownerAddress: item.ownerAddress,
                          } as WithdrewFromMiningPool)
                  )
              );
              break;
          case 'WithdrewFromLiquidityPool':
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
              return outputObservable.pipe(
                  map(
                      (item) =>
                          ({
                              transactionNonce: item.nonce,
                              transactionSender: item.from,
                              blockHeight: item.blockNumber,
                              timeStamp: new Date(item.timeStamp * 1000),
                              card: item.card,
                              amount: item.value,
                              pairTokenSymbol: item.pairTokenSymbol,
                              beneficiaryAddress: item.beneficiaryAddress,
                          } as WithdrewFromLiquidityPool)
                  )
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
              return outputObservable.pipe(
                  map(
                      (item) => {
                          return {
                              transactionNonce: item.nonce,
                              transactionSender: item.from,
                              blockHeight: item.blockNumber,
                              timeStamp: new Date(item.timeStamp * 1000 ),
                              rawTimeStamp: item.timeStamp,
                              card: item.card,
                              amount: item.value,
                              ownerAddress: item.ownerAddress,
                          };
                      }
                  )
              );
              break;
          default:
      }
  }

  public renderView(modal: any): any {
    return '';
  }
}
