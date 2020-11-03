import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from '../../pipes/pipe.module';
import { TooltipBox } from './tooltip-box';
import { Tooltip } from './tooltip.directive';

@NgModule({
  entryComponents: [TooltipBox],
  declarations: [Tooltip, TooltipBox],
  imports: [CommonModule, IonicModule, PipeModule, TranslateModule],
  exports: [Tooltip],
})
export class TooltipModule {}
