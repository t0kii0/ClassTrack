import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InicioPage } from './inicio.page';
import { InicioRoutingModule } from './inicio-routing.module';


@NgModule({
  declarations: [InicioPage],
  imports: [
    CommonModule,
    InicioRoutingModule,
    IonicModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioPageModule { }
