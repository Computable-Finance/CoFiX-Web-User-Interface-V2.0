import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CofiPage } from './cofi.page';
import { TranslateModule } from '@ngx-translate/core';
import { CommonComponentsModule } from '../common/components/common-components.module';
import { CofiRoutingModule } from './cofi-routing.module';
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
    CofiRoutingModule,
    PipeModule,
    DirectivesModule,
    TooltipModule,
  ],
  declarations: [CofiPage],
  exports: [CofiPage],
})
export class CofiPageModule {}
