import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LbclasesPage } from './lbclases.page';

const routes: Routes = [
  {
    path: '',
    component: LbclasesPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LbclasesRoutingModule { }
