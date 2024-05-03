import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AsistenciaPage } from './asistencia.page';

import { AsistenciaRoutingModule } from './asistencia-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistenciaRoutingModule,
    
  ],
  declarations: [AsistenciaPage],
  
})
export class AsistenciaModule { }
