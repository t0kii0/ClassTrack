import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AnotacionService } from '../services/anotacion/anotacion.service';

@Component({
  selector: 'app-anotacion-modal',
  templateUrl: './anotacion-modal.component.html',
  styleUrls: ['./anotacion-modal.component.scss'],
})
export class AnotacionModalComponent implements OnInit {
  @Input() idAlumno!: string;
  @Input() idAsignatura!: number;
  anotacionText: string = '';
  anotacionTipo: boolean = true; // true for 'positiva', false for 'negativa'

  constructor(
    private modalController: ModalController,
    private anotacionService: AnotacionService
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
