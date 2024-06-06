import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-observacion-modal',
  templateUrl: './observacion-modal.component.html',
  styleUrls: ['./observacion-modal.component.scss'],
})
export class ObservacionModalComponent implements OnInit {
  observacionText: string = '';
  observacionTipo: boolean = true; // true para positiva, false para negativa

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  submitObservacion() {
    // Aquí puedes manejar el envío de la observación, por ejemplo, enviarla a un servicio
    console.log('Observación:', this.observacionText);
    console.log('Tipo:', this.observacionTipo ? 'Positiva' : 'Negativa');
    this.closeModal();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
