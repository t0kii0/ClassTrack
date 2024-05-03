import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmacionModalPage } from './confirmacion-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmacionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmacionModalPageRoutingModule {}
