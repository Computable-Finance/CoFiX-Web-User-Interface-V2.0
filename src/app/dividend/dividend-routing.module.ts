import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DividendPage } from './dividend.page';

const routes: Routes = [
  {
    path: '',
    component: DividendPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DividendRoutingModule {}
