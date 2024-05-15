import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from '../services/asignatura/asignatura.service';
import { ModelAsignatura } from '../modelos/asignaturaModel';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {

  asignaturas: ModelAsignatura[] = [];

  constructor(
    private obtenerAsignatura: AsignaturaService,
    private router: Router,
    private alertController: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.obtenerAsignatura.obtenerTodoAsignatura().subscribe(
      (data: ModelAsignatura[]) =>{
        this.asignaturas = data;
      },
      error =>{
        console.error('Error al obtener las asignaturas', error);
      }
    );
  }
  notas(){
    console.log('llegaste a notas');
    this.router.navigate(['/lbclases']);
  }
}
