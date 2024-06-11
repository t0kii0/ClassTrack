import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LbclasesPage } from './lbclases.page';
import { LbclasesRoutingModule } from './lbclases-routing.module';


@NgModule({
  declarations: [LbclasesPage],
  imports: [
    CommonModule,
    FormsModule,
    LbclasesRoutingModule,
    IonicModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LbclasesModule { }
