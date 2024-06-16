import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerObservacionesPage } from './ver-observaciones.page';

const routes: Routes = [
  {
    path: '',
    component: VerObservacionesPage
  },
  {
  path: ':rut',
  component: VerObservacionesPage
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerObservacionesPageRoutingModule {}
