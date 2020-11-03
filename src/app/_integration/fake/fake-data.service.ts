import { Injectable } from '@angular/core';
import { BigNumber } from '@ethersproject/bignumber';
import {
  Activity,
  ApprovedForLiquidityPool,
  ApprovedForMiningPool,
  DepositedForMiningPool, DividendPoolShare,
  LiquidityPoolShare,
  MiningPoolShare,
  Token,
  WithdrewFromLiquidityPool,
  СofiToken
} from '../types';
import { random, uuidv4 } from './utility';

@Injectable({
  providedIn: 'root',
})
export class FakeDataService {
  constructor() {}

  public generateApprovedActivity<T extends Activity>(transactionNonce, returnType): T {
    let fakeObject;
    switch (returnType) {
      case 'ApprovedForLiquidityPool': {
        fakeObject = {
          transactionNonce,
          transactionSender: 'hu',
          blockHeight: 42,
          timeStamp: new Date('October 25, 2020 23:59:59'),
          card: null,
          amount: BigNumber.from(1),
          ownerAddress: '',
        } as ApprovedForLiquidityPool;

        break;
      }

      case 'ApprovedForMiningPool': {
        fakeObject = {
          transactionNonce,
          transactionSender: 'hu',
          blockHeight: 42,
          timeStamp: new Date('October 25, 2020 23:59:59'),
          card: null,
          amount: BigNumber.from(1),
          ownerAddress: '',
        } as ApprovedForMiningPool;

        break;
      }

      case 'DepositedForMiningPool': {
        fakeObject = {
          transactionNonce,
          transactionSender: 'hu',
          blockHeight: 42,
          timeStamp: new Date('October 25, 2020 23:59:59'),
          card: null,
          amount: BigNumber.from(1),
          depositorAddress: '',
        } as DepositedForMiningPool;
        break;
      }

      case 'WithdrewFromMiningPool': {
        fakeObject = {
          transactionNonce,
          transactionSender: 'hu',
          blockHeight: 42,
          timeStamp: new Date('October 25, 2020 23:59:59'),
          card: null,
          amount: BigNumber.from(1),
          beneficiary: '',
        };
        break;
      }

      case 'WithdrewFromLiquidityPool': {
        fakeObject = {
          transactionNonce,
          transactionSender: 'hu',
          blockHeight: 42,
          timeStamp: new Date('October 25, 2020 23:59:59'),
          card: null,
          amount: BigNumber.from(1),
          pairTokenSymbol: '',
          beneficiaryAddress: '',
        } as WithdrewFromLiquidityPool;
        break;
      }
    }
    return fakeObject;
  }

  public generateToken(): Token {
    return {
      LiquidityPoolShare: {
        '0xdAC17F958D2ee523a2206206994597C13D831ec7': this.generateLiquidityPoolShare('USDT'),
        '0x0316EB71485b0Ab14103307bf65a021042c6d380': this.generateLiquidityPoolShare('HBTC'),
      },
      MiningPoolShare: {
        '0xdAC17F958D2ee523a2206206994597C13D831ec7': this.generateMiningPoolShare('USDT'),
        '0x0316EB71485b0Ab14103307bf65a021042c6d380': this.generateMiningPoolShare('HBTC'),
      },
      CoFi: undefined,
    };
  }

  public generateLiquidityPoolShare(pairSymbol): LiquidityPoolShare {
    return {
      pairSymbol,
      pair: uuidv4(),
      balance: BigNumber.from(random(1, 100)),
      pairedTokenAllowance: BigNumber.from(1),
      totalSupply: BigNumber.from(1),
      navPerShare: BigNumber.from(1),
      navPerShareSubscription: BigNumber.from(1),
      navPerShareRedemption: BigNumber.from(1),
    };
  }

  public generateMiningPoolShare(pairSymbol): MiningPoolShare {
    return {
      pairSymbol,
      pair: uuidv4(),
      balance: BigNumber.from(random(1, 100)),
      poolSize: BigNumber.from(1),
      miningAllowance: BigNumber.from(1),
      cofiMiningRate: BigNumber.from(1),
      cofiReceivable: BigNumber.from(1),
    };
  }

  public generateDividendPoolShare(): DividendPoolShare {
    return {
      balance: BigNumber.from(1),
      cofiAllowance: BigNumber.from(1),
      poolSize: BigNumber.from(1),
      poolEthBalance: BigNumber.from(1),
      dividendPayoutRatio: 0.2,
      dividendReceivable: 1,
    };
  }

  public generateСofiToken(): СofiToken {
    return {
      balance: BigNumber.from(1),
      totalSupply: BigNumber.from(1),
    };
  }
}
