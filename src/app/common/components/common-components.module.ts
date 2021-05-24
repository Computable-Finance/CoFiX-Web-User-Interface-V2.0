import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FooterCompoment } from './footer/footer-component';
import { HeaderCompoment } from './header/header-component';
import { PipeModule } from '../pipes/pipe.module';
import { CoinInput } from './coin-input/coin-input';
import { CoinSelector } from './coin-input/selector/coin-selector';
import { WarningDetailPage } from 'src/app/liquid/warning/warning-detail/warning-detail.page';
import { CardTitlePage } from './card-title/card-title';
import { TokenInfoPage } from './token-info/token-info.page';
import { ProfitPage } from 'src/app/liquid/profit/profit.page';
import { DirectivesModule } from '../directive/directives.module';
import { TooltipModule } from '../directive/tooltip/tooltip.module';
import { TxConfirmModal } from './transaction/tx-confirm/tx-confirm.modal';
import { TxStatusModal } from './transaction/tx-status/tx-status.modal';
import { ConnectModal } from './connect-modal/connect-modal';
import { TipPannel } from './tip-pannel/tip-pannel';
import { ArrowButton } from './arrow-button/arrow-button';
import { WalletButton } from './wallet-button/wallet-button';
import { PairSwitch } from './pair-switch/pair-switch';
import { MenuPage } from './lang-button/menu/menu.page';
import { LangButton } from './lang-button/lang-button';
import { TxHistoryModal } from './transaction/tx-history/tx-history.modal';
import { CofiCard } from 'src/app/dividend/cofi-card/cofi-card';
import { ErrorModal } from './error-modal/error.modal';

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
    FooterCompoment,
    HeaderCompoment,
    TipPannel,
    CoinInput,
    CoinSelector,
    WalletButton,
    PairSwitch,
    ProfitPage,
    LangButton,
    WarningDetailPage,
    ArrowButton,
    CardTitlePage,
    TokenInfoPage,
    CofiCard,
    MenuPage,
    TxHistoryModal,
    TxConfirmModal,
    TxStatusModal,
    ConnectModal,
    ErrorModal,
  ],
  exports: [
    FooterCompoment,
    HeaderCompoment,
    TipPannel,
    CoinInput,
    WalletButton,
    PairSwitch,
    ProfitPage,
    LangButton,
    WarningDetailPage,
    ArrowButton,
    CardTitlePage,
    TokenInfoPage,
    CofiCard,
    MenuPage,
    TxHistoryModal,
    TxConfirmModal,
    TxStatusModal,
    ConnectModal,
    ErrorModal,
  ],
})
export class CommonComponentsModule {}
