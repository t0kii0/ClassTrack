import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearAsistentePage } from './crear-asistente.page';

const routes: Routes = [
  {
    path: '',
    component: CrearAsistentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearAsistentePageRoutingModule {}
