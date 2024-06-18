import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelAlumno } from '../modelos/userModel';
import { UserService } from '../services/users/users.service';
import { AsistenciaService } from '../services/asistencia/asistencia.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  alumnos: ModelAlumno[] = [];
  idAsignatura?: number;
  idCurso?: number;
  cambiosGuardados: boolean = true;
  showNotificationsMenu = false;
  notifications = ['Notificación 1', 'Notificación 2', 'Notificación 3']; // Ejemplo de notificaciones

  constructor(
    private alertController: AlertController,
    private alumnosService: UserService,
    private asistenciaService: AsistenciaService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.idAsignatura = +params['asignaturaId'];
      this.idCurso = +params['cursoId'];
      this.cargarAlumnos();
    });
  }
  toggleNotificationsMenu() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
  }

  cargarAlumnos() {
    if (this.idCurso !== undefined) {
      this.alumnosService.obtenerTodoAlumno(this.idCurso).subscribe(
        (alumnos: ModelAlumno[]) => {
          this.alumnos = alumnos.map(alumno => ({ ...alumno, status: '1' })); // Todos marcados como "Presente" por defecto
          console.log(alumnos);
        },
        (error: any) => {
          console.error('Error al cargar alumnos:', error);
        }
      );
    }
  }

  markAttendance(alumno: ModelAlumno, status: string) {
    alumno.status = status;
    if (status !== '3') { // "Justificado" es 3
      alumno.observation = ''; 
    }
    this.cambiosGuardados = false; 
  }

  async guardar() {
    const estudiantesSeleccionados = this.alumnos.filter(alumno => alumno.status);
    if (estudiantesSeleccionados.length === 0) {
      this.mostrarMensajeError('No se puede registrar la asistencia sin seleccionar estudiantes.');
      return;
    }

    let errorOccurred = false;

    for (const alumno of estudiantesSeleccionados) {
      const nuevaAsistencia = {
        id_alumno: alumno.rut,
        id_asignatura: this.idAsignatura!,
        id_curso: this.idCurso!,
        fecha_asis: new Date(),
        asistio: alumno.status === '1',
        justificacion: alumno.observation || ''
      };

      try {
        await this.asistenciaService.agregarAsistencia(nuevaAsistencia).toPromise();
      } catch (error) {
        console.error('Error al guardar asistencia:', error);
        errorOccurred = true;
      }
    }

    if (errorOccurred) {
      this.mostrarMensajeError('Hubo un error al guardar la asistencia de algunos alumnos.');
    } else {
      this.mostrarMensajeExito('Asistencia guardada correctamente.');
      this.cambiosGuardados = true;
    }
  }

  async mostrarMensajeError(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarMensajeExito(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  irAInicio() {
    this.router.navigate(['/inicio']);
  }

  ionViewCanLeave() {
    if (!this.cambiosGuardados) { 
      return new Promise<boolean>(async (resolve) => {
        const alert = await this.alertController.create({
          header: 'Advertencia',
          message: '¿Estás seguro de que quieres salir sin guardar los cambios?',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => resolve(false)
            },
            {
              text: 'Salir',
              handler: () => resolve(true)
            }
          ]
        });
        await alert.present();
      });
    } else {
      return true; 
    }
  }
}
