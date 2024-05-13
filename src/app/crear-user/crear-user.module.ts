import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearUserPageRoutingModule } from './crear-user-routing.module';
import { CrearUserPage } from './crear-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearUserPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CrearUserPage]
})
export class CrearUserPageModule {}
