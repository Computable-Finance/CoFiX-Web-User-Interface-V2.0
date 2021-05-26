import { Component, OnDestroy, OnInit } from '@angular/core';
import BNJS from 'bignumber.js/bignumber';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TipPannelContent } from '../common/components/tip-pannel/tip-pannel';
import { BalanceTruncatePipe } from '../common/pipes/balance.pipe';
import { isValidNumberForTx } from '../common/uitils/bignumber-utils';
import { Utils } from '../common/utils';
import { CofiXService } from '../service/cofix.service';
import { EventBusService } from '../service/eventbus.service';
import { BalancesQuery } from '../state/balance/balance.query';
import { TxService } from '../state/tx/tx.service';
import { SettingsQuery } from '../state/setting/settings.query';
import { WarningDetailPage } from './warning/warning-detail/warning-detail.page';
import { ModalController } from '@ionic/angular';
import { SettingsService } from '../state/setting/settings.service';
import { truncate } from '../common/uitils/bignumber-utils';

@Component({
  selector: 'app-dividend',
  templateUrl: './dividend.page.html',
  styleUrls: ['./dividend.page.scss'],
})
export class DividendPage implements OnInit, OnDestroy {
  public incomeContent: TipPannelContent = {
    title: 'about_redeem',
    descriptions: ['income_desc1', 'income_desc2'],
    more: {
      text: 'income_more',
      url:
        'https://cn.etherscan.com/address/0x278f5d08bEa1989BEfcC09A20ad60fB39702D556',
    },
  };

  cofiTokenAddress: string;
  CoFiXDAO: string;
  cofiToken: string;
  CoFiXDAOAddress: string;
  totalETHFromSwapFees: string;
  totalETHInDividendPool: string;
  cofiETHPrice: string
  daoLockAmount: string
  daoRedeemAmount: string
  ethBalance: string
  // ethTotalClaimed: string;
  earnedETH: string;
  isLoading = false;
  isLoadingProfit = { sq: false, cr: false, qc: false };
  profitCoin = 'CoFi';
  isApproved = false;
  incomeError = { isError: false, msg: '' };
  receiveError = { isError: false, msg: '' };
  isShowModal = false;
  profit = { title: '', subtitle: '', isDeposit: false };
  cardTitle = { title: '' };
  buttonTitle = {
    deposit: 'income_deposit_btn',
    withdraw: 'income_withdraw_btn',
  };

  private resizeSubscription: Subscription;
  private dividendSubscription: Subscription;
  private cofiBalanceSubscription: Subscription;
  private CoFiXDAOSubscription: Subscription;
  private eventbusSubscription: Subscription;

  constructor(
    public cofixService: CofiXService,
    private balanceTruncatePipe: BalanceTruncatePipe,
    public settingsQuery: SettingsQuery,
    private modalController: ModalController,
    private settingsService: SettingsService,
    private utils: Utils,
    private txService: TxService,
    private balancesQuery: BalancesQuery,
    private eventbusService: EventBusService
  ) {}

  async ngOnInit() {
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((event) => {
        this.changeButtonTitle();
      });
    this.eventbusSubscription = this.eventbusService.on(
      'connection_changed',
      () => {
        this.initPage();
      }
    );
  }
  ionViewWillEnter() {
    setTimeout(() => {
      if (this.cofixService.getCurrentAccount()) {
        this.initPage();
      } else {
        this.showConnectModal();
      }
    }, 500);
  }

  async showConnectModal() {
    const popover = await this.utils.showConnectModal();
    await popover.present();
    popover.onDidDismiss().then((res: any) => {
      if (res?.data?.connected) {
        this.initPage();
      }
    });
  }

  ngOnDestroy() {
    this.resizeSubscription?.unsubscribe();
    this.dividendSubscription?.unsubscribe();
    this.cofiBalanceSubscription?.unsubscribe();
    this.CoFiXDAOSubscription?.unsubscribe();
    this.eventbusSubscription?.unsubscribe();
  }

  changeButtonTitle() {
    if (window.innerWidth < 500) {
      this.buttonTitle = {
        deposit: 'income_deposit_btn_short',
        withdraw: 'income_withdraw_btn_short',
      };
      this.cardTitle.title = this.profit.title + '_short';
    } else {
      this.buttonTitle = {
        deposit: 'income_deposit_btn',
        withdraw: 'income_withdraw_btn',
      };
      this.cardTitle.title = this.profit.title;
    }
  }

  initPage() {
    this.resetReceiveError();
    this.getCoFiTokenAndRewardsAndSubscribe();
    this.getIsApproved();
    this.changeButtonTitle();
  }

  async getCoFiTokenAndRewardsAndSubscribe() {
    this.cofiTokenAddress = this.cofixService.getCurrentContractAddressList().CoFiToken;
    this.cofiToken = await this.balanceTruncatePipe.transform(
      await this.cofixService.getERC20Balance(this.cofiTokenAddress)
    );

    if (!this.cofiBalanceSubscription) {
      this.cofiBalanceSubscription = this.balancesQuery
        .currentERC20Balance$(
          this.cofixService.getCurrentAccount(),
          this.cofiTokenAddress
        )
        .subscribe(async (balance) => {
          this.cofiToken = await this.balanceTruncatePipe.transform(balance);
        });
    }

    this.totalETHInDividendPool = await this.balanceTruncatePipe.transform(
      await this.cofixService.quotaOfCofi()
    );
    /*this.ethTotalClaimed = await this.balanceTruncatePipe.transform(
      this.cofixService.getETHTotalClaimed()
    );*/
    this.cofiETHPrice = await this.balanceTruncatePipe.transform(
      await this.cofixService.getOraclePrice(this.cofiTokenAddress)
    );

    this.cofiETHPrice = truncate((1 / parseFloat(this.cofiETHPrice)).toString(), 6)
    
    this.CoFiXDAOAddress = this.cofixService.getCurrentContractAddressList().CoFiXDAO;

    this.daoLockAmount = await this.balanceTruncatePipe.transform(
      await this.cofixService.totalETHRewards()
    );
    this.daoLockAmount = truncate(this.daoLockAmount, 4)

    this.daoRedeemAmount = await this.balanceTruncatePipe.transform(
      await this.cofixService.getCofiBalanceofContract(this.CoFiXDAOAddress)
    );
    this.daoRedeemAmount = truncate(this.daoRedeemAmount, 4)

    this.totalETHFromSwapFees = await this.balanceTruncatePipe.transform(
      await this.cofixService.totalETHFromSwapFees()
    );
    this.totalETHFromSwapFees = truncate((parseFloat(this.totalETHFromSwapFees) - parseFloat(this.daoRedeemAmount)).toString(), 4)

    this.ethBalance = await this.balanceTruncatePipe.transform(
      await this.cofixService.getETHBalance()
    );
    
  }

  async showWarning() {
    const knownRisk = this.settingsQuery.knownRisk();
    console.log(knownRisk);
    if (!knownRisk) {
      const modal = await this.modalController.create({
        component: WarningDetailPage,
        cssClass: 'popover-warning',
        animated: false,
        keyboardClose: false,
        showBackdrop: true,
        backdropDismiss: false,
      });
      await modal.present();
      modal.onDidDismiss().then((data: any) => {
        if (data.data.knownRisk) {
          this.settingsService.updateKnownRisk(data.data.knownRisk);
        }
      });
    }
  }

  resetReceiveError() {
    this.receiveError = { isError: false, msg: '' };
  }

  resetIncomeError() {
    this.incomeError = { isError: false, msg: '' };
  }

  async getIsApproved() {
    if (this.cofixService.getCurrentAccount()) {
      this.isApproved = await this.cofixService.approved(
        this.cofixService.getCurrentContractAddressList().CoFiToken,
        this.cofixService.getCurrentContractAddressList().CoFiXDAO
      );
    }
  }

  async approveCofi(event) {
    this.resetIncomeError();
    if (!this.isApproved) {
      this.waitingPopover = await this.utils.createTXConfirmModal();
      await this.waitingPopover.present();
      this.utils.approveHandler(
        this.isLoadingProfit,
        this.incomeError,
        this,
        this.cofixService.getCurrentContractAddressList().CoFiToken,
        this.cofixService.getCurrentContractAddressList().CoFiXDAO,
        'CoFi'
      );
    }
  }

  async saveCofi(event) {
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    this.cofixService
      .redeemCoFi(event.balance)
      .then((tx: any) => {
        this.isLoadingProfit.cr = true;
        const params = {
          t: 'tx_redeemCoFi',
          p: { d: new BNJS(event.balance) },
        };
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
          this.isLoadingProfit.cr = false;
          this.isShowModal = false;
          this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
        });
        provider.once('error', (error) => {
          this.isLoadingProfit.cr = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        this.isLoadingProfit.cr = false;
        this.waitingPopover.dismiss();
        if (error.message.indexOf('User denied') > -1) {
          this.utils.showTXRejectModal();
        } else {
          this.incomeError = { isError: true, msg: error.message };
        }
      });
  }

  waitingPopover: any;

  async receiveCofi(event) {
    this.waitingPopover = await this.utils.createTXConfirmModal();
    await this.waitingPopover.present();
    this.cofixService
      .withdrawDepositedCoFi(event.balance)
      .then((tx: any) => {
        this.isLoadingProfit.qc = true;
        const params = {
          t: 'tx_withdrawCoFi',
          p: { w: new BNJS(event.balance) },
        };
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
          this.isLoadingProfit.qc = false;
          this.isShowModal = false;
          this.utils.changeTxStatus(transactionReceipt.status, tx.hash);
        });
        provider.once('error', (error) => {
          this.isLoadingProfit.qc = false;
          this.txService.txFailed(tx.hash);
        });
      })
      .catch((error) => {
        this.isLoadingProfit.qc = false;
        this.waitingPopover.dismiss();
        if (error.message.indexOf('User denied') > -1) {
          this.utils.showTXRejectModal();
        } else {
          this.incomeError = { isError: true, msg: error.message };
        }
      });
  }

  showModal(type) {
    this.isShowModal = true;
    this.resetIncomeError();

    if (type === 'withdraw') {
      this.profit = {
        title: 'income_withdraw_title',
        subtitle: 'income_withdraw_subtitle',
        isDeposit: false,
      };
    } else {
      this.profit = {
        title: 'income_deposit_title',
        subtitle: 'income_deposit_subtitle',
        isDeposit: true,
      };
    }
    this.changeButtonTitle();
  }

  cancel() {
    this.isShowModal = false;
  }
}
