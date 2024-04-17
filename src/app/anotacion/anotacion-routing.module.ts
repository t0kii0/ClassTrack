import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnotacionPage } from './anotacion.page';

const routes: Routes = [
  {
    path: '',
    component: AnotacionPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnotacionRoutingModule { }
