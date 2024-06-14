import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearDocentePageRoutingModule } from './crear-docente-routing.module';

import { CrearDocentePage } from './crear-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearDocentePageRoutingModule
  ],
  declarations: [CrearDocentePage]
})
export class CrearDocentePageModule {}
