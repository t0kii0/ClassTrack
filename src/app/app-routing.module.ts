
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import authRoutes from './auth/features/auth-shell/auth-routing';
import { privateGuard, publicGuard } from './services/guards/auth.guard';
import { ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule


const routes: Routes = [
  {
    path: 'auth',
    canActivate: [publicGuard],
    children: authRoutes
  },
  {
    path: 'home',
    canActivate: [privateGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'inicio',
    canActivate: [privateGuard],
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  
  {
    path: 'lbclases',
    canActivate: [privateGuard],
    loadChildren: () => import('./lbclases/lbclases.module').then( m => m.LbclasesModule)
  },
  {
    path: 'anotacion',
    canActivate: [privateGuard],
    loadChildren: () => import('./anotacion/anotacion.module').then( m => m.AnotacionModule)
  },
  {
    path: 'asistencia',
    canActivate: [privateGuard],
    loadChildren: () => import('./asistencia/asistencia.module').then( m => m.AsistenciaModule)
  },
  {
    path: 'observacion',
    canActivate: [privateGuard],
    loadChildren: () => import('./observacion/observacion.module').then( m => m.ObservacionModule)
  },
  {
    path: 'reporte',
    canActivate: [privateGuard],
    loadChildren: () => import('./reporte/reporte.module').then( m => m.ReporteModule)
  },
  {
    path: 'login',
    canActivate: [privateGuard],
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'configuracion',
    canActivate: [privateGuard],
    loadChildren: () => import('./configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'crear-user',
    canActivate: [privateGuard],
    loadChildren: () => import('./crear-user/crear-user.module').then( m => m.CrearUserPageModule)
  },  
  {
    path: 'asignatura',
    canActivate: [privateGuard],
    loadChildren: () => import('./asignatura/asignatura.module').then( m => m.AsignaturaPageModule)
  },
  
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'

  },
  {
    path: 'confirmacion-modal',
    canActivate: [privateGuard],
    loadChildren: () => import('./confirmacion-modal/confirmacion-modal.module').then( m => m.ConfirmacionModalPageModule)
  },
  {
    path: 'crear-asignatura',
    canActivate: [privateGuard],
    loadChildren: () => import('./crear-asignatura/crear-asignatura.module').then( m => m.CrearAsignaturaPageModule)
  },
  {
    path: 'cursos',
    canActivate: [privateGuard],
    loadChildren: () => import('./cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'informe-nota',
    canActivate: [privateGuard],
    loadChildren: () => import('./informe-nota/informe-nota.module').then( m => m.InformeNotaPageModule)
  },
  {
    path: 'informe-observacion',
    canActivate: [privateGuard],
    loadChildren: () => import('./informe-observacion/informe-observacion.module').then( m => m.InformeObservacionPageModule)
  },
  {
    path: 'nota-alumno',
    canActivate: [privateGuard],
    loadChildren: () => import('./nota-alumno/nota-alumno.module').then( m => m.NotaAlumnoPageModule)
  },
  {
    path: 'informe-asistencia',
    canActivate: [privateGuard],
    loadChildren: () => import('./informe-asistencia/informe-asistencia.module').then( m => m.InformeAsistenciaPageModule)
  },
  {
    path: 'crear-asistente',
    canActivate: [privateGuard],
    loadChildren: () => import('./crear-asistente/crear-asistente.module').then( m => m.CrearAsistentePageModule)
  },
  {
    path: 'crear-docente',
    canActivate: [privateGuard],
    loadChildren: () => import('./crear-docente/crear-docente.module').then( m => m.CrearDocentePageModule)
  },
  {
    path: 'menu-informes',
    canActivate: [privateGuard],
    loadChildren: () => import('./menu-informes/menu-informes.module').then( m => m.MenuInformesPageModule)
  },
  {
    path: 'nota-config',
    canActivate: [privateGuard],
    loadChildren: () => import('./nota-config/nota-config.module').then( m => m.NotaConfigPageModule)
  },
  {
    path: 'ver-notas',
    canActivate: [privateGuard],
    loadChildren: () => import('./ver-notas/ver-notas.module').then( m => m.VerNotasPageModule)
  },
  {
    path: 'informe-anotacion',
    canActivate: [privateGuard],
    loadChildren: () => import('./informe-anotacion/informe-anotacion.module').then( m => m.InformeAnotacionPageModule)
  },
  {
    path: 'ver-anotacion',
    canActivate: [privateGuard],
    loadChildren: () => import('./ver-anotacion/ver-anotacion.module').then( m => m.VerAnotacionPageModule)
  },
  { path: 'ver-observaciones', 
    canActivate: [privateGuard],
    loadChildren: () => import('./ver-observaciones/ver-observaciones.module').then(m => m.VerObservacionesPageModule) },
  {
    path: 'ver-asistencia',
    canActivate: [privateGuard],
    loadChildren: () => import('./ver-asistencia/ver-asistencia.module').then( m => m.VerAsistenciaPageModule)
  },
  {
    path: 'agendar-cita',
    canActivate: [privateGuard],
    loadChildren: () => import('./agendar-cita/agendar-cita.module').then( m => m.AgendarCitaPageModule)
  },


  
];


@NgModule({
  imports: [
    ReactiveFormsModule, // Importar ReactiveFormsModule aquí
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
