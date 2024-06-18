import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerAnotacionPageRoutingModule } from './ver-anotacion-routing.module';

import { VerAnotacionPage } from './ver-anotacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerAnotacionPageRoutingModule
  ],
  declarations: [VerAnotacionPage]
})
export class VerAnotacionPageModule {}
