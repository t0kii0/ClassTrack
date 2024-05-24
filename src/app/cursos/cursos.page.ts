import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ModelCurso } from '../modelos/cursoModel';
import { CursoService } from '../services/curso/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  curso: ModelCurso[] = [];

  constructor(
    private obtenerCurso: CursoService,
    private router: Router,
    private alertController: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.obtenerCurso.obtenerTodoCurso().subscribe(
      (data: ModelCurso[]) =>{
        this.curso = data;
      },
      error =>{
        console.error('Error al obtener los cursos', error);
      }
    );
  }

  verCursos(idCurso: number) {
    this.router.navigate(['/asignatura'], { queryParams: { cursoId: idCurso } });
  }
}
