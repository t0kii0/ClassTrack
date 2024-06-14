import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformeObservacionPage } from './informe-observacion.page';

const routes: Routes = [
  {
    path: '',
    component: InformeObservacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeObservacionPageRoutingModule {}
