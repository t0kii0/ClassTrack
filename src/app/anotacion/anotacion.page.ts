import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModelAlumno } from '../modelos/userModel';
import { UserService } from '../services/users/users.service';
import { AnotacionService } from '../services/anotacion/anotacion.service';
import { ModelAnotacion } from '../modelos/anotacionModel';
import { AnotacionModalComponent } from '../anotacion-modal/anotacion-modal.component';
import { NotificacionService } from '../services/notificaciones/notificacion.service'; // Importa el servicio de notificaciones
import { ModelNotificacion } from '../modelos/notificacionModel'; // Importa el modelo de notificación

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
  anotacionTipo: boolean = true; // true para 'positiva', false para 'negativa'
  showNotificationsMenu = false;
  notifications = ['Notificación 1', 'Notificación 2', 'Notificación 3']; // Ejemplo de notificaciones

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private navController: NavController,
    private alumnosService: UserService,
    private route: ActivatedRoute,
    private anotacionService: AnotacionService,
    private notificationService: NotificacionService // Inyecta el servicio de notificaciones
  ) { }

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

  goBack() {
    this.navController.pop();
  }

  irAInicio() {
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
      const fecha = new Date();
      const idAlumno = 'idAlumno'; // Ajustar esto según cómo obtienes el id del alumno

      this.anotacionService.agregarAnotacionAlumnoAsignatura(
        idAlumno,
        this.idAsignatura,
        this.anotacionTipo,
        fecha,
        this.anotacionText
      ).subscribe(
        (response: any) => {
          console.log('Anotación guardada:', response);

          // Si la anotación es negativa, envía una notificación
          if (!this.anotacionTipo) {
            const mensaje = `Anotación negativa registrada para el alumno con ID: ${idAlumno}.`;
            const notification: ModelNotificacion = {
              mensaje: mensaje,
              rol: 'ADMIN', // Cambia esto según el rol adecuado
              email: 'man.conchar@duocuc.cl', // Reemplaza con el correo real o según tu lógica
              fecha: new Date()
            };

            this.notificationService.sendNotification(notification).subscribe(
              notificationResponse => {
                console.log('Notificación enviada:', notificationResponse);
                // Envía un correo de notificación si es necesario
                this.notificationService.sendEmail(notification.email, 'Notificación de Anotación Negativa', mensaje).subscribe(
                  emailResponse => {
                    console.log('Correo enviado:', emailResponse);
                  },
                  emailError => {
                    console.error('Error al enviar correo:', emailError);
                  }
                );
              },
              notificationError => {
                console.error('Error al enviar notificación:', notificationError);
              }
            );
          }
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
