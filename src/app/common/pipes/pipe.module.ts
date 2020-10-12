import { NgModule } from '@angular/core';
import { BalancePipe } from './balance.pipe';
import { ERC20BalancePipe } from './erc20balance.pipe';
import { TruncatePipe } from './truncateString.pipe';
import { WalletAddressPipe } from './wallet-address.pipe';
@NgModule({
  declarations: [
    WalletAddressPipe,
    BalancePipe,
    ERC20BalancePipe,
    TruncatePipe,
  ],
  exports: [WalletAddressPipe, BalancePipe, ERC20BalancePipe, TruncatePipe],
})
export class PipeModule {}
