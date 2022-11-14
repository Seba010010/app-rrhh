import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiocontrasenaPage } from './cambiocontrasena.page';

const routes: Routes = [
  {
    path: '',
    component: CambiocontrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiocontrasenaPageRoutingModule {}
