import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformeNotaPageRoutingModule } from './informe-nota-routing.module';

import { InformeNotaPage } from './informe-nota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformeNotaPageRoutingModule
  ],
  declarations: [InformeNotaPage]
})
export class InformeNotaPageModule {}
