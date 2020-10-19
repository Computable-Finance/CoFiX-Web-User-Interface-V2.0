import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LiquidPage } from './liquid.page';
import { TranslateModule } from '@ngx-translate/core';
import { CommonComponentsModule } from '../common/components/common-components.module';
import { LiquidRoutingModule } from './liquid-routing.module';
import { PipeModule } from '../common/pipes/pipe.module';
import { AddLiquidPage } from './add/add-liquid.page';
import { RedeemLiquidPage } from './redeem/redeem-liquid.page';
import { ExplainLiquidPage } from './explain/explain-liquid.page';
import { WarningLiquidPage } from './warning/warning-liquid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CommonComponentsModule,
    LiquidRoutingModule,
    PipeModule,
  ],
  declarations: [
    LiquidPage,
    AddLiquidPage,
    RedeemLiquidPage,
    ExplainLiquidPage,
    WarningLiquidPage,
  ],
  exports: [LiquidPage],
})
export class LiquidPageModule {}
