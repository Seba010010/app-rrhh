import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarAsistencia2PageRoutingModule } from './registrar-asistencia2-routing.module';

import { RegistrarAsistencia2Page } from './registrar-asistencia2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarAsistencia2PageRoutingModule
  ],
  declarations: [RegistrarAsistencia2Page]
})
export class RegistrarAsistencia2PageModule {}
