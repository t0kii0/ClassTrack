import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformeAnotacionPageRoutingModule } from './informe-anotacion-routing.module';

import { InformeAnotacionPage } from './informe-anotacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformeAnotacionPageRoutingModule
  ],
  declarations: [InformeAnotacionPage]
})
export class InformeAnotacionPageModule {}
