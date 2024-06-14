import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuInformesPageRoutingModule } from './menu-informes-routing.module';

import { MenuInformesPage } from './menu-informes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuInformesPageRoutingModule
  ],
  declarations: [MenuInformesPage]
})
export class MenuInformesPageModule {}
