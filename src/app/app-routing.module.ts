import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':lang/swap',
    loadChildren: () =>
      import('./swap/swap.module').then((m) => m.SwapPageModule),
  },
  {
    path: ':lang/liquid',
    loadChildren: () =>
      import('./liquid/liquid.module').then((m) => m.LiquidPageModule),
  },
  {
    path: ':lang/income',
    loadChildren: () =>
      import('./income/income.module').then((m) => m.IncomePageModule),
  },
  {
    path: ':lang/cofi',
    loadChildren: () =>
      import('./cofi/cofi.module').then((m) => m.CofiPageModule),
  },
  {
    path: '',
    redirectTo: ':lang/swap',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      //useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
