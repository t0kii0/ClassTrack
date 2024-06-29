import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerGraficoPageRoutingModule } from './ver-grafico-routing.module';

import { VerGraficoPage } from './ver-grafico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerGraficoPageRoutingModule
  ],
  declarations: [VerGraficoPage]
})
export class VerGraficoPageModule {}
