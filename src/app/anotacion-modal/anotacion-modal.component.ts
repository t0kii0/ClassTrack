import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-anotacion-modal',
  templateUrl: './anotacion-modal.component.html',
  styleUrls: ['./anotacion-modal.component.scss'],
})
export class AnotacionModalComponent  implements OnInit {

  anotacionText: string = '';
  anotacionTipo: string = 'positiva';

  constructor(private modalController: ModalController) { }

  submitAnotacion() {
    this.modalController.dismiss({
      anotacionText: this.anotacionText,
      anotacionTipo: this.anotacionTipo
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {}

}
