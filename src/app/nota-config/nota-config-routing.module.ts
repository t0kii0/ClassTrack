import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaConfigPage } from './nota-config.page';

const routes: Routes = [
  {
    path: '',
    component: NotaConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaConfigPageRoutingModule {}
