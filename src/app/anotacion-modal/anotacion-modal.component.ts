import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AnotacionService } from '../services/anotacion/anotacion.service';
import { NotificacionService } from '../services/notificaciones/notificacion.service'; // Importa el servicio de notificaciones
import { ModelNotificacion } from '../modelos/notificacionModel';

@Component({
  selector: 'app-anotacion-modal',
  templateUrl: './anotacion-modal.component.html',
  styleUrls: ['./anotacion-modal.component.scss'],
})
export class AnotacionModalComponent implements OnInit {
  @Input() idAlumno!: string;
  @Input() idAsignatura!: number;
  anotacionText: string = '';
  anotacionTipo: boolean = true; // true para 'positiva', false para 'negativa'

  constructor(
    private modalController: ModalController,
    private anotacionService: AnotacionService,
    private notificationService: NotificacionService // Inyecta el servicio de notificaciones
  ) { }

  ngOnInit() {}

  submitAnotacion() {
    const fecha = new Date();
    this.anotacionService.agregarAnotacionAlumnoAsignatura(
      this.idAlumno,
      this.idAsignatura,
      this.anotacionTipo,
      fecha,
      this.anotacionText
    ).subscribe(
      (response: any) => {
        console.log('Anotación guardada:', response);

        // Si la anotación es negativa, envía una notificación
        if (!this.anotacionTipo) {
          const mensaje = `Anotación negativa registrada para el alumno con ID: ${this.idAlumno}.`;
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

        this.modalController.dismiss({ data: response });
      },
      (error: any) => {
        console.error('Error al guardar anotación:', error);
      }
    );
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
