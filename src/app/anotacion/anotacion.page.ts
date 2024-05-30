import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ConfirmacionModalPage } from '../confirmacion-modal/confirmacion-modal.page';
//import { ModelAlumno } from '../modelos/userModel';
import { UserService } from '../services/users/users.service';
import { AnotacionModalComponent } from '../anotacion-modal/anotacion-modal.component';

interface Student {
  rut: string;
  nombre: string;
  curso?: string;
  anotacion?: string;
}

@Component({
  selector: 'app-anotacion',
  templateUrl: './anotacion.page.html',
  styleUrls: ['./anotacion.page.scss'],
})
export class AnotacionPage  implements OnInit {
  //alumnos: ModelAlumno[] = [];

  students: Student[] = [
    { rut: '1-9', nombre: 'Hermes Peralta', curso: '1-A'},
    { rut: '2-0', nombre: 'Juan Perez', curso: '1-A'},
    { rut: '2-1', nombre: 'Pedro Perez', curso: '2-A'},
    { rut: '2-2', nombre: 'Maria Perez', curso: '3-A'},
  ] 

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private navController: NavController,
    //private alumnosService: UserService
  ) { }

  ngOnInit() {
    //this.cargarAlumnos();
  }

  goBack() {
    this.navController.pop();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AnotacionModalComponent
    });
    
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        console.log('Anotación guardada:', data.data);
        // Aquí puedes manejar los datos de la anotación como desees
      }
    });

    return await modal.present();
  }

  /* cargarAlumnos() {
    this.alumnosService.obtenerTodoAlumno().subscribe(
      (alumnos: ModelAlumno[]) => {
        this.alumnos = alumnos;
      },
      error => {
        console.error('Error al cargar alumnos:', error);
      }
    );
  } */

  /* async mostrarAlumnoDetailsAlert(alumno: ModelAlumno) {
    const alert = await this.alertController.create({
      header: 'Detalles del alumno',
      message: `
        <strong>RUT:</strong> ${alumno.rut}<br>
        <strong>Nombre:</strong> ${alumno.nombre}<br>
        <strong>Edad:</strong> ${alumno.apellido}<br>
        <strong>Curso:</strong> ${alumno.apmaterno}<br>
      `,
      buttons: ['OK']
    });

    await alert.present();
  } */

}