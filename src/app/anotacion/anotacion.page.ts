import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModelAlumno } from '../modelos/userModel';
import { UserService } from '../services/users/users.service';
import { AnotacionService } from '../services/anotacion/anotacion.service';
import { ModelAnotacion } from '../modelos/anotacionModel';
import { AnotacionModalComponent } from '../anotacion-modal/anotacion-modal.component';

@Component({
  selector: 'app-anotacion',
  templateUrl: './anotacion.page.html',
  styleUrls: ['./anotacion.page.scss'],
})
export class AnotacionPage implements OnInit {
  alumnos: ModelAlumno[] = [];
  idAsignatura?: number;
  idCurso?: number; 
  anotacionText: string = '';
  anotacionTipo: boolean = true;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private navController: NavController,
    private alumnosService: UserService,
    private route: ActivatedRoute,
    private anotacionService: AnotacionService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {  
      this.idAsignatura = +params['asignaturaId'];
      this.idCurso = +params['cursoId'];
      this.cargarAlumnos();
    });
  }

  goBack() {
    this.navController.pop();
  }

  irAInicio() {
    // Redirige a la página de inicio
    this.navController.navigateForward('/inicio');
  }

  async presentModal(rut: string) {
    const modal = await this.modalController.create({
      component: AnotacionModalComponent,
      componentProps: {
        idAlumno: rut,
        idAsignatura: this.idAsignatura
      }
    });
    
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        console.log('Anotación guardada:', data.data);
        // Aquí puedes manejar los datos de la anotación como desees
      }
    });

    return await modal.present();
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

  submitAnotacion() {
    if (this.idAsignatura !== undefined) {
      const fecha = new Date(); // Puedes ajustar la fecha según tus necesidades
      this.anotacionService.agregarAnotacionAlumnoAsignatura(
        'idAlumno', // Deberás ajustar esto según cómo obtienes el id del alumno
        this.idAsignatura,
        this.anotacionTipo,
        fecha,
        this.anotacionText
      ).subscribe(
        (response: any) => {
          console.log('Anotación guardada:', response);
          // Manejar la respuesta, por ejemplo, mostrar una notificación al usuario
        },
        (error: any) => {
          console.error('Error al guardar anotación:', error);
        }
      );
    } else {
      console.error('idAsignatura no está definido');
    }
  }
  
}
