import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ObservacionService } from '../services/Observacion/observacion.service';
import { NotificacionService } from '../services/notificaciones/notificacion.service';
import { ModelNotificacion } from '../modelos/notificacionModel';
import { ModelAsistente } from '../modelos/asistenteModel';

@Component({
  selector: 'app-observacion-modal',
  templateUrl: './observacion-modal.component.html',
  styleUrls: ['./observacion-modal.component.scss'],
})
export class ObservacionModalComponent implements OnInit {
  @Input() idAlumno!: string;
  @Input() autor!: ModelAsistente; // Recibe el autor como entrada
  observacionText: string = '';

  constructor(
    private modalController: ModalController,
    private observacionService: ObservacionService,
    private notificationService: NotificacionService
  ) {}

  ngOnInit() {
    // Cualquier lógica adicional que necesites en la inicialización
  }

  submitObservacion() {
    const fecha = new Date();
    const observacion = this.observacionText;

    this.observacionService.agregarObservacionAlumno(
      this.idAlumno,
      fecha,
      observacion,
      this.autor.rol // Usa el rol del autor
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
