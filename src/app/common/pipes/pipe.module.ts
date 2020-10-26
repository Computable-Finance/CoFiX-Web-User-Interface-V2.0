import { NgModule } from '@angular/core';

import { BalanceTruncatePipe } from './balance.pipe';
import { WalletAddressPipe } from './wallet-address.pipe';

@NgModule({
  declarations: [WalletAddressPipe, BalanceTruncatePipe],
  exports: [WalletAddressPipe, BalanceTruncatePipe],
})
export class PipeModule {}
