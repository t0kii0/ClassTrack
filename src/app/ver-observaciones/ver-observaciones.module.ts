import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VerObservacionesPageRoutingModule } from './ver-observaciones-routing.module';
import { VerObservacionesPage } from './ver-observaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerObservacionesPageRoutingModule
  ],
  declarations: [VerObservacionesPage]
})
export class VerObservacionesPageModule {}
