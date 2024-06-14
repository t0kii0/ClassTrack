import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearDocentePage } from './crear-docente.page';

const routes: Routes = [
  {
    path: '',
    component: CrearDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearDocentePageRoutingModule {}
