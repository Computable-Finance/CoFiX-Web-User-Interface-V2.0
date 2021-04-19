import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DividendInfoPage } from './dividend-info.page';

const routes: Routes = [
  {
    path: '',
    component: DividendInfoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DividendRoutingModule {}
