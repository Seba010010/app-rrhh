import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiocontrasenaPageRoutingModule } from './cambiocontrasena-routing.module';

import { CambiocontrasenaPage } from './cambiocontrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiocontrasenaPageRoutingModule
  ],
  declarations: [CambiocontrasenaPage]
})
export class CambiocontrasenaPageModule {}
