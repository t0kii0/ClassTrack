import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ObservacionRoutingModule } from './observacion-routing.module';
import { ObservacionPage } from './observacion.page';

@NgModule({
  declarations: [ObservacionPage],
  imports: [
    CommonModule,
    ObservacionRoutingModule,
    FormsModule,
    IonicModule,
  ]
})
export class ObservacionModule { }
