
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'lbclases',
    loadChildren: () => import('./lbclases/lbclases.module').then( m => m.LbclasesModule)
  },
  {
    path: 'anotacion',
    loadChildren: () => import('./anotacion/anotacion.module').then( m => m.AnotacionModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaModule)
  },
  {
    path: 'observacion',
    loadChildren: () => import('./observacion/observacion.module').then( m => m.ObservacionModule)
  },
  {
    path: 'reporte',
    loadChildren: () => import('./reporte/reporte.module').then( m => m.ReporteModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'crear-user',
    loadChildren: () => import('./crear-user/crear-user.module').then( m => m.CrearUserPageModule)
  },  
  {
    path: 'asignatura',
    loadChildren: () => import('./asignatura/asignatura.module').then( m => m.AsignaturaPageModule)
  },
  
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'

  },
  {
    path: 'confirmacion-modal',
    loadChildren: () => import('./confirmacion-modal/confirmacion-modal.module').then( m => m.ConfirmacionModalPageModule)
  },
  {
    path: 'crear-asignatura',
    loadChildren: () => import('./crear-asignatura/crear-asignatura.module').then( m => m.CrearAsignaturaPageModule)
  },  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then( m => m.CursosPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
