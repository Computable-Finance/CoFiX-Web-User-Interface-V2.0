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
import { ProfitPage } from './profit/profit.page';
import { SwitchLangPage } from './switch-lang/switch-lang.page';
import { SiderMenuPage } from './sider-menu/sider-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipeModule,
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
    SiderMenuPage,
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
  ],
})
export class CommonComponentsModule {}
