import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteGraficoPage } from './reporte-grafico.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteGraficoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteGraficoPageRoutingModule {}
