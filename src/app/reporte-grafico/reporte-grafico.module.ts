import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteGraficoPageRoutingModule } from './reporte-grafico-routing.module';

import { ReporteGraficoPage } from './reporte-grafico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteGraficoPageRoutingModule
  ],
  declarations: [ReporteGraficoPage]
})
export class ReporteGraficoPageModule {}
