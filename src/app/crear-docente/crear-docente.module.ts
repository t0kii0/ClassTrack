import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearDocentePageRoutingModule } from './crear-docente-routing.module';
import { CrearDocentePage } from './crear-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearDocentePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CrearDocentePage]
})
export class CrearDocentePageModule {}
