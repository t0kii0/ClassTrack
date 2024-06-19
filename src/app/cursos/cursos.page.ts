import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ModelCurso } from '../modelos/cursoModel';
import { CursoService } from '../services/curso/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  showNotificationsMenu = false;
  notifications = ['Notificación 1', 'Notificación 2', 'Notificación 3']; // Ejemplo de notificaciones

  curso: ModelCurso[] = [];
  opcionSeleccionada: string = '';

  constructor(
    private obtenerCurso: CursoService,
    private router: Router,
    private alertController: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // obtener curso
    this.obtenerCurso.obtenerTodoCurso().subscribe(
      (data: ModelCurso[]) => {
        console.log('Datos obtenidos:', data); // Imprimir la estructura de los datos
        this.curso = data;
      },
      error => {
        console.error('Error al obtener los cursos', error);
      }
    );
        // Obtener el parámetro de la URL
        this.route.queryParams.subscribe(params => {
          this.opcionSeleccionada = params['opcion'] || ''; // Asignar el valor del parámetro, si existe
          console.log('Opción seleccionada:', this.opcionSeleccionada);
        });
  }

  goBack() {
    this.navCtrl.pop();
  }

  irAInicio() {
    // Redirige a la página de inicio
    this.router.navigate(['/inicio']);
  }
  toggleNotificationsMenu() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
  }

  verCursos(idCurso: number) {
    console.log(this.opcionSeleccionada);
    console.log('ID del curso:', idCurso); // Verificar el valor del ID
    this.router.navigate(['/asignatura'],
     { queryParams: { cursoId: idCurso, opcion: this.opcionSeleccionada } });
    console.log(this.opcionSeleccionada);
  }

}
