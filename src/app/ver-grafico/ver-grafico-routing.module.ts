import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerGraficoPage } from './ver-grafico.page';

const routes: Routes = [
  {
    path: '',
    component: VerGraficoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerGraficoPageRoutingModule {}
