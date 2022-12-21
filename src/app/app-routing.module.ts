import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ApiService } from './services/api.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'principal',
    redirectTo: 'principal',
    pathMatch: 'full'
  },


  {
    path: 'cambiocontrasena',
    redirectTo: 'cambiocontrasena',
    pathMatch: 'full'
  },

  {
    path: 'registro',
    redirectTo: 'registro',
    pathMatch: 'full'
  },

  {
  path: 'registrar-asistencia',
  redirectTo: 'registrar-asistencia',
  pathMatch: 'full'
},

{
  path: 'registrar-asistencia2',
  redirectTo: 'registrar-asistencia2',
  pathMatch: 'full'
},







  //Este siempre tiene que ser el ultimo
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },

  //Estos son los que cargan la página
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule),canActivate: [ApiService]
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: 'cambiocontrasena',
    loadChildren: () => import('./pages/cambiocontrasena/cambiocontrasena.module').then( m => m.CambiocontrasenaPageModule),canActivate: [ApiService]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'registrar-asistencia',
    loadChildren: () => import('./pages/registrar-asistencia/registrar-asistencia.module').then( m => m.RegistrarAsistenciaPageModule),canActivate: [ApiService]
  },
  {
    path: 'registrar-asistencia2',
    loadChildren: () => import('./pages/registrar-asistencia2/registrar-asistencia2.module').then( m => m.RegistrarAsistencia2PageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
