import { NgModule } from '@angular/core';

import { BalanceTruncatePipe } from './balance.pipe';
import { MarkedPipe } from './marked.pipe';
import { WalletAddressPipe } from './wallet-address.pipe';

@NgModule({
  declarations: [WalletAddressPipe, BalanceTruncatePipe, MarkedPipe],
  exports: [WalletAddressPipe, BalanceTruncatePipe, MarkedPipe],
})
export class PipeModule {}
