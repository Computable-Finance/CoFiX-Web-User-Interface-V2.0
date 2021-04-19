import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CofiXLegacyService } from 'src/app/service/cofix-legacy.service';
import { BalanceTruncatePipe } from '../../pipes/balance.pipe';
import { isValidNumberForTx } from '../../uitils/bignumber-utils';
import BNJS from 'bignumber.js';
import { Utils } from '../../utils';
import { TxService } from 'src/app/state/tx/tx.service';
import { CofiXService } from 'src/app/service/cofix.service';
import { CoinContent } from '../../types/CoinContent';
import { CoinInput } from '../coin-input/coin-input';
import { BalancesQuery } from 'src/app/state/balance/balance.query';
import { MarketDetailsQuery } from 'src/app/state/market/market.query';

@Component({
  selector: 'app-redeem-legacy-liquid',
  templateUrl: './redeem-legacy-liquid.page.html',
  styleUrls: ['./redeem-legacy-liquid.page.scss'],
})
export class RedeemLegacyLiquidPage implements OnInit {
  coin: string = 'USDT';
  @ViewChild(CoinInput, { static: false }) toCoinInputView: CoinInput;
  fromCoin: CoinContent = {
    id: 'ETH',
    address: '',
    amount: '',
    isApproved: false,
    balance: '',
  };
  toCoin: CoinContent = {
    id: 'USDT',
    address: '',
    amount: '',
    isApproved: false,
    balance: '',
  };
  isSelectCoin = false;
  xtValue = 'XT-1';
  //isETHChecked = false;

  coinAddress: string;
  todoValue: string;
  hadValue: string;
  oracleCost = '0.01';
  isLoading = { sh: false, sq: false };
  showError = false;
  amountForRemoveLiquidity: any = { erc20Amount: '', ethAmount: '', fee: '' };
  redeemError = { isError: false, msg: '' };

  cardTitle = {
    title: 'liquidpool_withdraw_title',
    subtitle: 'liquidpool_withdraw_subtitle',
  };
  waitingPopover: any;
  maxERC20Liquid: string;
  maxETHLiquid: string;

  constructor(
    public cofixService: CofiXService,
    private cofixLegacyService: CofiXLegacyService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    private utils: Utils,
    private txService: TxService,
    private balancesQuery: BalancesQuery,
    private marketDetailsQuery: MarketDetailsQuery,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.toCoin.id = this.coin;
    this.initCoinContent();
    this.getIsApproved();
    this.getRemoveLiquidity();
    this.changeCartTitle();
  }

  ngOnDestroy() {}

  changeCartTitle() {
    if (window.innerWidth < 500) {
      this.cardTitle = {
        title: 'liquidpool_withdraw_title_short',
        subtitle: 'liquidpool_withdraw_subtitle_short',
      };
    } else {
      this.cardTitle = {
        title: 'liquidpool_withdraw_title',
        subtitle: 'liquidpool_withdraw_subtitle',
      };
    }
  }
  async setToCoinMax(event) {
    if (!this.cofixService.getCurrentAccount()) {
      return false;
    }
    this.toCoin.amount = this.todoValue;
    this.toCoin.balance = this.todoValue;
    this.getRemoveLiquidity();
  }

  confirmAddLiquid() {}

  changeETHCheck() {
    this.getRemoveLiquidity();
  }

  changeTokenCheck() {
    this.getRemoveLiquidity();
    this.resetRedeemError();
  }

  async initCoinContent() {
    this.fromCoin.amount = '';
    this.toCoin.amount = '';
    this.todoValue = '';
    this.hadValue = '';
    this.resetRedeemError();

    this.fromCoin.address = this.cofixLegacyService.getCurrentContractAddressList()[
      this.fromCoin.id
    ];
    this.toCoin.address = this.cofixLegacyService.getCurrentContractAddressList()[
      this.toCoin.id
    ];

    if (this.cofixService.getCurrentAccount()) {
      this.todoValue = await this.balanceTruncatePipe.transform(
        await this.cofixLegacyService.getERC20Balance(
          await this.cofixLegacyService.getPairAddressByToken(
            this.toCoin.address
          )
        )
      );

      this.hadValue = await this.balanceTruncatePipe.transform(
        await this.cofixLegacyService.getERC20Balance(
          await this.cofixLegacyService.getStakingPoolAddressByToken(
            this.toCoin.address
          )
        )
      );
    }
    this.maxERC20Liquid = await this.cofixLegacyService.getERC20BalanceOfPair(
      this.toCoin.address,
      this.toCoin.address
    );
    this.maxETHLiquid = await this.cofixLegacyService.getERC20BalanceOfPair(
      this.toCoin.address,
      this.cofixLegacyService.getCurrentContractAddressList().WETH9
    );
  }

  async walletConnected() {
    this.initCoinContent();
    this.getIsApproved();
  }

  async ToCoinInput(event) {
    this.toCoin.amount = event.amount;
    this.getRemoveLiquidity();
    this.resetRedeemError();
  }

  async getRemoveLiquidity() {
    const pair = await this.cofixLegacyService.getPairAddressByToken(
      this.toCoin.address
    );
    this.amountForRemoveLiquidity = await this.cofixLegacyService.getETHAndTokenForRemoveLiquidity(
      this.toCoin.address,
      pair,
      this.toCoin.amount || '0'
    );
    this.canShowError();
  }

  async getIsApproved() {
    this.toCoin.isApproved = await this.cofixLegacyService.approved(
      await this.cofixLegacyService.getPairAddressByToken(this.toCoin.address),
      this.cofixLegacyService.getCurrentContractAddressList().CofixRouter
    );
  }

  async redeem() {
    this.resetRedeemError();
    const token = this.toCoin.address;
    const pair = await this.cofixLegacyService.getPairAddressByToken(
      this.toCoin.address
    );

    //let amountTokenMin;
    const params = {
      t: 'tx_withdrawLiquid',
      p: {
        w: new BNJS(this.toCoin.amount),
      },
    };
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    this.cofixLegacyService
      .removeLiquidityGetTokenAndETH(
        pair,
        token,
        this.toCoin.amount || '0',
        this.amountForRemoveLiquidity.ethAmount,
        this.amountForRemoveLiquidity.erc20Amount,
        this.oracleCost
      )
      .then((tx: any) => {
        console.log('tx.hash', tx.hash);
        this.isLoading.sh = true;

        console.log(params);
        this.txService.add(
          tx.hash,
          this.cofixService.getCurrentAccount(),
          JSON.stringify(params),
          this.cofixService.getCurrentNetwork()
        );
        this.waitingPopover.dismiss();
        this.utils.showTXSubmitModal(tx.hash);
        const provider = this.cofixService.getCurrentProvider();
        provider.once(tx.hash, (transactionReceipt) => {
          this.isLoading.sh = false;
          this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
        });

        provider.once('error', (error) => {
          console.log('provider.once==', error);
          this.isLoading.sh = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        console.log(error);

        this.isLoading.sh = false;
        this.waitingPopover.dismiss();
        if (error.message.indexOf('User denied') > -1) {
          this.utils.showTXRejectModal();
        } else {
          this.redeemError = { isError: true, msg: error.message };
        }
      });
  }
  resetRedeemError() {
    this.redeemError = { isError: false, msg: '' };
  }
  async approve() {
    this.resetRedeemError();

    if (!this.toCoin.isApproved) {
      this.waitingPopover = await this.utils.createTXConfirmModal();
      await this.waitingPopover.present();
      this.utils.approveHandler(
        this.isLoading,
        this.redeemError,
        this,
        await this.cofixLegacyService.getPairAddressByToken(
          this.toCoin.address
        ),
        this.cofixLegacyService.getCurrentContractAddressList().CofixRouter,
        `ETH/${this.toCoin.id} Liquidity Pool`
      );
    }
  }

  canRedeem() {
    return (
      this.toCoin.isApproved &&
      Number(this.toCoin.amount) !== 0 &&
      new BNJS(this.toCoin.amount).lte(new BNJS(this.todoValue))
    );
  }

  canShowError() {
    this.showError = new BNJS(this.toCoin.amount).gt(new BNJS(this.todoValue));
  }

  overERC20Liquid() {
    return new BNJS(this.amountForRemoveLiquidity.erc20Amount).gt(
      new BNJS(this.maxERC20Liquid)
    );
  }

  overETHLiquid() {
    return new BNJS(this.amountForRemoveLiquidity.ethAmount).gt(
      new BNJS(this.maxETHLiquid)
    );
  }

  close() {
    this.modalController.dismiss();
  }
}
