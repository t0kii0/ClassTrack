import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformeAnotacionPage } from './informe-anotacion.page';

const routes: Routes = [
  {
    path: '',
    component: InformeAnotacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeAnotacionPageRoutingModule {}
