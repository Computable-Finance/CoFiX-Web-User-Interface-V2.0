import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LiquidPage } from "./liquid.page";

const routes: Routes = [
  {
    path: "",
    component: LiquidPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiquidRoutingModule {}
