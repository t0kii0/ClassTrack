// src/app/observacion-modal/observacion-modal.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ObservacionService } from '../services/Observacion/observacion.service';

@Component({
  selector: 'app-observacion-modal',
  templateUrl: './observacion-modal.component.html',
  styleUrls: ['./observacion-modal.component.scss'],
})
export class ObservacionModalComponent implements OnInit {
  @Input() idAlumno!: string;
  observacionText: string = '';
  autor: string = 'rol';

  constructor(
    private modalController: ModalController,
    private observacionService: ObservacionService
  ) {}

  ngOnInit(
  ) {}

  submitObservacion() {
    const fecha = new Date();
    const observacion = this.observacionText;
    console.log(this.idAlumno);
    console.log(this.autor);
    console.log(fecha)
    console.log(observacion)
    

    this.observacionService.agregarObservacionAlumno(
      this.idAlumno,
      fecha,
      observacion,
      this.autor)
      .subscribe(
        (response: any) => {
          console.log('Observación guardada:', response);
          this.closeModal();
        },
        (error: any) => {
          console.error('Error al guardar la observación:', error);
        }
      );
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
