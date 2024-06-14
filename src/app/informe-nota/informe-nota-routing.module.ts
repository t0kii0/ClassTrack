import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformeNotaPage } from './informe-nota.page';

const routes: Routes = [
  {
    path: '',
    component: InformeNotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformeNotaPageRoutingModule {}
