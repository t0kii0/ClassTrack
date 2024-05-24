import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from '../services/asignatura/asignatura.service';
import { ModelAsignatura } from '../modelos/asignaturaModel';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {

  asignaturas: ModelAsignatura[] = [];
  cursoId?: number;

  constructor(
    private obtenerAsignatura: AsignaturaService,
    private router: Router,
    private alertController: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    this.cursoId = parseInt(params['cursoId'], 10);  // Convertir a número
    console.log('Curso ID recibido:', this.cursoId);
    this.cargarAsignaturas();
  });
}

  cargarAsignaturas() {
    this.obtenerAsignatura.obtenerTodoAsignatura().subscribe(
      (data: ModelAsignatura[]) => {
        console.log('Asignaturas recibidas:', data); // Log para depuración
        this.asignaturas = data.filter(asignatura => {
          console.log('Filtrando asignatura:', asignatura); // Log para depuración
          return asignatura.cursoId === this.cursoId;
        });
        console.log('Asignaturas filtradas:', this.asignaturas); // Log para depuración
      },
      error => {
        console.error('Error al obtener las asignaturas', error);
      }
    );
  }

  verDetallesAsignatura(idAsignatura: number) {
    this.router.navigate(['/lbclases'], { queryParams: { asignaturaId: idAsignatura, cursoId: this.cursoId } });
  }
}
