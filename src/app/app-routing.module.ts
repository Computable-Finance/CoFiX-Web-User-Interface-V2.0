import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'swap',
    loadChildren: () =>
      import('./swap/swap.module').then((m) => m.SwapPageModule),
  },
  {
    path: 'liquid',
    loadChildren: () =>
      import('./liquid/liquid.module').then((m) => m.LiquidPageModule),
  },
  {
    path: 'dividend',
    loadChildren: () =>
      import('./dividend/dividend.module').then((m) => m.DividendPageModule),
  },
  {
    path: 'cofi',
    loadChildren: () =>
      import('./cofi/cofi.module').then((m) => m.CofiPageModule),
  },
  {
    path: '',
    redirectTo: 'swap',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
