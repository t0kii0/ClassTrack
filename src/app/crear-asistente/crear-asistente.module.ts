import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearAsistentePageRoutingModule } from './crear-asistente-routing.module';

import { CrearAsistentePage } from './crear-asistente.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearAsistentePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CrearAsistentePage]
})
export class CrearAsistentePageModule {}
