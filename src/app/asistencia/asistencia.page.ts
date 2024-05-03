import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ConfirmacionModalPage } from '../confirmacion-modal/confirmacion-modal.page';

interface Student {
  id: number;
  name: string;
  status?: string;
  observation?: string;
}

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  students: Student[] = [
    { id: 1, name: 'Hermes Peralta' },
    { id: 2, name: 'Maria Lopez' },
    { id: 3, name: 'Jose Garcia' },
    { id: 4, name: 'Maria Rodriguez' },
    { id: 5, name: 'Juan Martinez' },
    { id: 6, name: 'Laura Hernandez' },
    // Agrega más estudiantes aquí
  ];

  cambiosGuardados: boolean = true; // Indica si los cambios han sido guardados

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private navController: NavController
  ) {}

  markAttendance(student: Student, status: string) {
    student.status = status;
    if (status !== 'justificado') {
      student.observation = ''; // Elimina la observación si el estudiante no está justificado
    }
    this.cambiosGuardados = false; // Marca que hay cambios sin guardar
  }

  async guardar() {
    const estudiantesSeleccionados = this.students.filter(student => student.status);
    if (estudiantesSeleccionados.length === 0) {
      this.mostrarMensajeError();
    } else {
      const modal = await this.modalController.create({
        component: ConfirmacionModalPage,
        componentProps: {
          students: this.students 
        }
      });
      await modal.present();
      this.cambiosGuardados = true; 
    }
  }

  async mostrarMensajeError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No se puede registrar la asistencia sin seleccionar estudiantes.',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {}

  
  ionViewCanLeave() {
    if (!this.cambiosGuardados) { 
      return new Promise<boolean>(async (resolve) => {
        const alert = await this.alertController.create({
          header: 'Advertencia',
          message: '¿Estás seguro de que quieres salir sin guardar los cambios?',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => resolve(false) 
            },
            {
              text: 'Salir',
              handler: () => resolve(true) 
            }
          ]
        });
        await alert.present();
      });
    } else {
      return true; 
    }
  }

}
