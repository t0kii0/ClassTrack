import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaAlumnoPageRoutingModule } from './nota-alumno-routing.module';

import { NotaAlumnoPage } from './nota-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaAlumnoPageRoutingModule
  ],
  declarations: [NotaAlumnoPage]
})
export class NotaAlumnoPageModule {}
