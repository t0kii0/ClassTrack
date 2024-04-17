import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObservacionPage } from './observacion.page';

const routes: Routes = [
  {
    path: '',
    component: ObservacionPage,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservacionRoutingModule { }
