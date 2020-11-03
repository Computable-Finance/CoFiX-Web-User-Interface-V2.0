import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwapPage } from './swap.page';
import { TranslateModule } from '@ngx-translate/core';
import { CommonComponentsModule } from '../common/components/common-components.module';
import { SwapRoutingModule } from './swap-routing.module';
import { PipeModule } from '../common/pipes/pipe.module';
import { DirectivesModule } from '../common/directive/directives.module';
import { TooltipModule } from '../common/directive/tooltip/tooltip.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CommonComponentsModule,
    SwapRoutingModule,
    PipeModule,
    DirectivesModule,
    TooltipModule,
  ],
  declarations: [SwapPage],
  exports: [SwapPage],
})
export class SwapPageModule {}
