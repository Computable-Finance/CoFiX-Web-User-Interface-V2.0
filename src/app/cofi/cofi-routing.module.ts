import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CofiPage } from "./cofi.page";

const routes: Routes = [
  {
    path: "",
    component: CofiPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CofiRoutingModule {}
