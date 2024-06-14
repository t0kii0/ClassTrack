import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformeObservacionPageRoutingModule } from './informe-observacion-routing.module';

import { InformeObservacionPage } from './informe-observacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformeObservacionPageRoutingModule
  ],
  declarations: [InformeObservacionPage]
})
export class InformeObservacionPageModule {}
