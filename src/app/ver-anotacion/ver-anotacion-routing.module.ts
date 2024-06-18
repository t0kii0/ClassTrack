import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerAnotacionPage } from './ver-anotacion.page';

const routes: Routes = [
  {
    path: '',
    component: VerAnotacionPage
  },
  {
    path: ':rut',
    component: VerAnotacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerAnotacionPageRoutingModule {}
