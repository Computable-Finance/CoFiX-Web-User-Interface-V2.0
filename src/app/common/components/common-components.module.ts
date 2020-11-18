import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FooterPage } from './footer/footer.page';
import { HeaderPage } from './header/header.page';
import { PipeModule } from '../pipes/pipe.module';
import { CoinInput } from './coin-input/coin-input';
import { CoinSelector } from './coin-input/selector/coin-selector';
import { ConnectWalletPage } from './connect-wallet/connect-wallet.page';
import { LiquidInputPage } from './liquid-input/liquid-input.page';
import { SwitchLangPage } from './switch-lang/switch-lang.page';
import { WarningDetailPage } from 'src/app/liquid/warning/warning-detail/warning-detail.page';
import { CardTitlePage } from './card-title/card-title';
import { TokenInfoPage } from './token-info/token-info.page';
import { IncomeProfitPage } from 'src/app/income/profit/profit.page';
import { ProfitPage } from 'src/app/liquid/profit/profit.page';
import { DirectivesModule } from '../directive/directives.module';
import { TooltipModule } from '../directive/tooltip/tooltip.module';
import { MenuPage } from './switch-lang/menu/menu.page';
import { TxListPage } from './transaction/tx-List/tx-list.page';
import { TxConfirmPage } from './transaction/tx-confirm/tx-confirm.page';
import { TxStatusPage } from './transaction/tx-status/tx-status.page';
import { ConnectPage } from './connect-modal/connect.page';
import { TipPannel } from './tip-pannel/tip-pannel';
import { ArrowButton } from './arrow-button/arrow-button';

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
    TipPannel,
    CoinInput,
    CoinSelector,
    ConnectWalletPage,
    LiquidInputPage,
    ProfitPage,
    SwitchLangPage,
    WarningDetailPage,
    ArrowButton,
    CardTitlePage,
    TokenInfoPage,
    IncomeProfitPage,
    MenuPage,
    TxListPage,
    TxConfirmPage,
    TxStatusPage,
    ConnectPage,
  ],
  exports: [
    FooterPage,
    HeaderPage,
    TipPannel,
    CoinInput,
    ConnectWalletPage,
    LiquidInputPage,
    ProfitPage,
    SwitchLangPage,
    WarningDetailPage,
    ArrowButton,
    CardTitlePage,
    TokenInfoPage,
    IncomeProfitPage,
    MenuPage,
    TxListPage,
    TxConfirmPage,
    TxStatusPage,
    ConnectPage,
  ],
})
export class CommonComponentsModule {}
