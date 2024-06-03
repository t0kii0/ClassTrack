import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReporteRoutingModule } from './reporte-routing.module';
import { ReportePage } from './reporte.page';

@NgModule({
  declarations: [ReportePage],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    FormsModule,
    IonicModule,
  ],
  
})
export class ReporteModule { }
