import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

interface Student {
  id: number;
  name: string;
  status?: string;
  observation?: string;
}

@Component({
  selector: 'app-confirmacion-modal',
  templateUrl: './confirmacion-modal.page.html',
  styleUrls: ['./confirmacion-modal.page.scss'],
})
export class ConfirmacionModalPage {

  @Input() students!: Student[]; // Usa "!" para indicar a TypeScript que la propiedad será inicializada antes de usarse

  constructor(private modalController: ModalController) {}

  cerrarModal() {
    this.modalController.dismiss();
  }
}
