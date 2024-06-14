import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaAlumnoPage } from './nota-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: NotaAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaAlumnoPageRoutingModule {}
