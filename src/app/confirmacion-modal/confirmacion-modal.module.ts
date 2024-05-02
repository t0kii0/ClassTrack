import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmacionModalPageRoutingModule } from './confirmacion-modal-routing.module';

import { ConfirmacionModalPage } from './confirmacion-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmacionModalPageRoutingModule
  ],
  declarations: [ConfirmacionModalPage]
})
export class ConfirmacionModalPageModule {}
