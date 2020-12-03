import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwapPage } from './swap.page';

const routes: Routes = [
  {
    path: '',
    component: SwapPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwapRoutingModule {}
