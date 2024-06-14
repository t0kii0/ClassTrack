import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuInformesPage } from './menu-informes.page';

const routes: Routes = [
  {
    path: '',
    component: MenuInformesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuInformesPageRoutingModule {}
