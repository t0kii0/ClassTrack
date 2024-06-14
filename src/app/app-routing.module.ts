
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import authRoutes from './auth/features/auth-shell/auth-routing';

const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes
  },
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
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then( m => m.CursosPageModule)
  },  {
    path: 'informe-nota',
    loadChildren: () => import('./informe-nota/informe-nota.module').then( m => m.InformeNotaPageModule)
  },
  {
    path: 'informe-observacion',
    loadChildren: () => import('./informe-observacion/informe-observacion.module').then( m => m.InformeObservacionPageModule)
  },
  {
    path: 'nota-alumno',
    loadChildren: () => import('./nota-alumno/nota-alumno.module').then( m => m.NotaAlumnoPageModule)
  },
  {
    path: 'informe-asistencia',
    loadChildren: () => import('./informe-asistencia/informe-asistencia.module').then( m => m.InformeAsistenciaPageModule)
  },
  {
    path: 'crear-asistente',
    loadChildren: () => import('./crear-asistente/crear-asistente.module').then( m => m.CrearAsistentePageModule)
  },
  {
    path: 'crear-docente',
    loadChildren: () => import('./crear-docente/crear-docente.module').then( m => m.CrearDocentePageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
