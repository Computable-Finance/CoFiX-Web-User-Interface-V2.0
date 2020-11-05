import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FooterPage } from './footer/footer.page';
import { HeaderPage } from './header/header.page';
import { PipeModule } from '../pipes/pipe.module';
import { BannerPage } from './banner/banner.page';
import { CoinInputPage } from './coin-input/coin-input.page';
import { CoinSelectPage } from './coin-input/select/coin-select.page';
import { ConnectWalletPage } from './connect-wallet/connect-wallet.page';
import { LiquidSelectPage } from './liquid-input/select/liquid-select.page';
import { LiquidInputPage } from './liquid-input/liquid-input.page';
import { SwitchLangPage } from './switch-lang/switch-lang.page';
import { WarningDetailPage } from 'src/app/liquid/warning/warning-detail/warning-detail.page';
import { SelectArrowPage } from './select-arrow/select-arrow.page';
import { CardTitlePage } from './card-title/card-title.page';
import { TokenInfoPage } from './token-info/token-info.page';
import { IncomeProfitPage } from 'src/app/income/profit/profit.page';
import { ProfitPage } from 'src/app/liquid/profit/profit.page';
import { DirectivesModule } from '../directive/directives.module';
import { TooltipModule } from '../directive/tooltip/tooltip.module';
import { MenuPage } from './switch-lang/menu/menu.page';
import { TxListPage } from './transaction/tx-List/tx-list.page';
import { TxConfirmPage } from './transaction/tx-confirm/tx-confirm.page';
import { TxStatusPage } from './transaction/tx-status/tx-status.page';
import { TxSuccessPage } from './transaction/tx-success/tx-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipeModule,
    DirectivesModule,
    TooltipModule,
  ],
  declarations: [
    FooterPage,
    HeaderPage,
    BannerPage,
    CoinInputPage,
    CoinSelectPage,
    ConnectWalletPage,
    LiquidSelectPage,
    LiquidInputPage,
    ProfitPage,
    SwitchLangPage,
    WarningDetailPage,
    SelectArrowPage,
    CardTitlePage,
    TokenInfoPage,
    IncomeProfitPage,
    MenuPage,
    TxListPage,
    TxConfirmPage,
    TxStatusPage,
    TxSuccessPage,
  ],
  exports: [
    FooterPage,
    HeaderPage,
    BannerPage,
    CoinInputPage,
    ConnectWalletPage,
    LiquidInputPage,
    ProfitPage,
    SwitchLangPage,
    WarningDetailPage,
    SelectArrowPage,
    CardTitlePage,
    TokenInfoPage,
    IncomeProfitPage,
    MenuPage,
    TxListPage,
    TxConfirmPage,
    TxStatusPage,
    TxSuccessPage,
  ],
})
export class CommonComponentsModule {}
