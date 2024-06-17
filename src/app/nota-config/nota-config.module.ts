import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NotaConfigPageRoutingModule } from './nota-config-routing.module';

import { NotaConfigPage } from './nota-config.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaConfigPageRoutingModule
  ],
  declarations: [NotaConfigPage]
})
export class NotaConfigPageModule {}
