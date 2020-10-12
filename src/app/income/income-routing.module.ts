import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IncomePage } from "./income.page";

const routes: Routes = [
  {
    path: "",
    component: IncomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomeRoutingModule {}
