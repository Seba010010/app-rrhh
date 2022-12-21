import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarAsistencia2Page } from './registrar-asistencia2.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarAsistencia2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarAsistencia2PageRoutingModule {}
