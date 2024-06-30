import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ObservacionService } from '../services/Observacion/observacion.service';
import { NotificacionService } from '../services/notificaciones/notificacion.service'; // Importa el servicio de notificaciones
import { ModelNotificacion } from '../modelos/notificacionModel'; // Importa el modelo de notificación

@Component({
  selector: 'app-observacion-modal',
  templateUrl: './observacion-modal.component.html',
  styleUrls: ['./observacion-modal.component.scss'],
})
export class ObservacionModalComponent implements OnInit {
  @Input() idAlumno!: string;
  observacionText: string = '';
  autor: string = 'rol'; // Este es el autor de la observación, puedes ajustarlo según tu lógica

  constructor(
    private modalController: ModalController,
    private observacionService: ObservacionService,
    private notificationService: NotificacionService // Inyecta el servicio de notificaciones
  ) {}

  ngOnInit() {}

  submitObservacion() {
    const fecha = new Date();
    const observacion = this.observacionText;
    console.log(this.idAlumno);
    console.log(this.autor);
    console.log(fecha);
    console.log(observacion);

    this.observacionService.agregarObservacionAlumno(
      this.idAlumno,
      fecha,
      observacion,
      this.autor
    ).subscribe(
      (response: any) => {
        console.log('Observación guardada:', response);
        this.closeModal();

        // Envía una notificación después de guardar la observación
        this.sendNotification();
      },
      (error: any) => {
        console.error('Error al guardar la observación:', error);
      }
    );
  }

  closeModal() {
    this.modalController.dismiss();
  }

  sendNotification() {
    const mensaje = `Se ha registrado una observación para el alumno con ID: ${this.idAlumno}.`;
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
}
