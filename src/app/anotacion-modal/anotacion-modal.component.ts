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

        // Si la anotación es negativa, envía una notificación a ADMIN y PSICOLOGO
        if (!this.anotacionTipo) {
          const mensaje = `Anotación negativa registrada para el alumno con ID: ${this.idAlumno}.`;
          const roles = ['ADMIN', 'PSICOLOGO'];
          
          roles.forEach(rol => {
            const notification: ModelNotificacion = {
              mensaje: mensaje,
              rol: rol,
              fecha: new Date()
            };

            this.notificationService.sendNotification(notification).subscribe(
              notificationResponse => {
                console.log(`Notificación enviada para rol ${rol}:`, notificationResponse);
              },
              notificationError => {
                console.error(`Error al enviar notificación para rol ${rol}:`, notificationError);
              }
            );
          });
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
