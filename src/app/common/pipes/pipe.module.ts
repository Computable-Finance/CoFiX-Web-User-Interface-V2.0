import { NgModule } from '@angular/core';

import { BalancePipe } from './balance.pipe';
import { TruncatePipe } from './truncateString.pipe';
import { WalletAddressPipe } from './wallet-address.pipe';

@NgModule({
  declarations: [WalletAddressPipe, BalancePipe, TruncatePipe],
  exports: [WalletAddressPipe, BalancePipe, TruncatePipe],
})
export class PipeModule {}
