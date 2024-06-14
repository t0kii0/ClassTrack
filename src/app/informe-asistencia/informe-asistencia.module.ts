import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformeAsistenciaPageRoutingModule } from './informe-asistencia-routing.module';

import { InformeAsistenciaPage } from './informe-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformeAsistenciaPageRoutingModule
  ],
  declarations: [InformeAsistenciaPage]
})
export class InformeAsistenciaPageModule {}
