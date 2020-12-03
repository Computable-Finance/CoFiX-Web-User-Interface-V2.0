import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DividendPage } from './dividend.page';
import { TranslateModule } from '@ngx-translate/core';
import { CommonComponentsModule } from '../common/components/common-components.module';
import { PipeModule } from '../common/pipes/pipe.module';
import { DirectivesModule } from '../common/directive/directives.module';
import { TooltipModule } from '../common/directive/tooltip/tooltip.module';
import { DividendRoutingModule } from './dividend-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CommonComponentsModule,
    DividendRoutingModule,
    PipeModule,
    DirectivesModule,
    TooltipModule,
  ],
  declarations: [DividendPage],
  exports: [DividendPage],
})
export class DividendPageModule {}
