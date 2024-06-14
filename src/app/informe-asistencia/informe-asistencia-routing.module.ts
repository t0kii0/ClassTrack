import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformeAsistenciaPage } from './informe-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: InformeAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeAsistenciaPageRoutingModule {}
