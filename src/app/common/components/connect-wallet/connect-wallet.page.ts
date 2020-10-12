import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CofiXService } from 'src/app/service/cofix.service';
import { ShareStateQuery } from '../../state/share.query';
import { ShareStateService } from '../../state/share.service';
import { Utils } from '../../utils';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.page.html',
  styleUrls: ['./connect-wallet.page.scss'],
})
export class ConnectWalletPage implements OnInit {
  @Output() onConnected = new EventEmitter<any>();
  isConnectLoading = false;
  constructor(
    private cofixService: CofiXService,
    private shareStateService: ShareStateService,
    public shareStateQuery: ShareStateQuery,
    private utils: Utils
  ) {}
  ngOnInit() {}

  async connect() {
    this.isConnectLoading = true;
    await this.cofixService.connectWallet().catch((err) => {
      console.log(err);
      this.isConnectLoading = false;
    });
    this.changeWalletAccount();
    this.utils.getPairAttended();
    this.isConnectLoading = false;
  }

  changeWalletAccount() {
    if (this.cofixService.getCurrentAccount()) {
      const shareState = this.shareStateQuery.getValue();
      shareState.currentAccount = this.cofixService.getCurrentAccount();
      shareState.connectedWallet = true;
      this.shareStateService.updateShareStore(shareState);
    }
  }
}
