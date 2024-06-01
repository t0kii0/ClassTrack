import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ConfirmacionModalPage } from '../confirmacion-modal/confirmacion-modal.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelAlumno } from '../modelos/userModel';
// import { ModelAsistencia} from '../modelos/userModel';
import { UserService } from '../services/users/users.service';

interface Student {
  rut: number;
  nombre: string;
  status?: string;
  observation?: string;
}

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  alumnos: ModelAlumno[] = [];
  idAsignatura?: number;
  idCurso?: number;

  students: Student[] = [
    { rut: 1, nombre: 'Hermes Peralta' },
    { rut: 2, nombre: 'Maria Lopez' },
    { rut: 3, nombre: 'Jose Garcia' },
    { rut: 4, nombre: 'Maria Rodriguez' },
    { rut: 5, nombre: 'Juan Martinez' },
    { rut: 6, nombre: 'Laura Hernandez' },
    // Agrega más estudiantes aquí
  ];

  cambiosGuardados: boolean = true; // Indica si los cambios han sruto guardados

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private alumnosService: UserService,
    private navController: NavController,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  markAttendance(student: Student, status: string) {
    student.status = status;
    if (status !== 'justificado') {
      student.observation = ''; // Elimina la observación si el estudiante no está justificado
    }
    this.cambiosGuardados = false; // Marca que hay cambios sin guardar
  }

  async guardar() {
    const estudiantesSeleccionados = this.students.filter(student => student.status);
    if (estudiantesSeleccionados.length === 0) {
      this.mostrarMensajeError();
    } else {
      const modal = await this.modalController.create({
        component: ConfirmacionModalPage,
        componentProps: {
          students: this.students 
        }
      });
      await modal.present();
      this.cambiosGuardados = true; 
    }
  }

  async mostrarMensajeError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No se puede registrar la asistencia sin seleccionar estudiantes.',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.idAsignatura = +params['asignaturaId'];
      this.idCurso = +params['cursoId'];
      this.cargarAlumnos();
    });
  }

  cargarAlumnos() {
    if (this.idCurso !== undefined) {
      this.alumnosService.obtenerTodoAlumno(this.idCurso).subscribe(
        (alumnos: ModelAlumno[]) => {
          this.alumnos = alumnos;
          console.log(alumnos);
          
        },
        error => {
          console.error('Error al cargar alumnos:', error);
        }
      );
    }
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
