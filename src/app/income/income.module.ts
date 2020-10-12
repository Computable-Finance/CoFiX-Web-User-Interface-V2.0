import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IncomePage } from './income.page';
import { TranslateModule } from '@ngx-translate/core';
import { CommonComponentsModule } from '../common/components/common-components.module';
import { IncomeRoutingModule } from './income-routing.module';
import { PipeModule } from '../common/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CommonComponentsModule,
    IncomeRoutingModule,
    PipeModule,
  ],
  declarations: [IncomePage],
  exports: [IncomePage],
})
export class IncomePageModule {}