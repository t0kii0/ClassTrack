import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/users.service';
import { NotasService } from '../services/nota/nota.service';
import { CursoService } from '../services/curso/curso.service';
import { AsignaturaService } from '../services/asignatura/asignatura.service';
import { PromedioService } from '../services/promedio/promedio.service'; // Importa el servicio de Promedio
import { ModelCurso } from '../modelos/cursoModel';
import { ModelAsignatura } from '../modelos/asignaturaModel';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nota-config',
  templateUrl: './nota-config.page.html',
  styleUrls: ['./nota-config.page.scss']
})
export class NotaConfigPage implements OnInit {
  cursos: ModelCurso[] = [];
  asignaturas: ModelAsignatura[] = [];
  asignaturasFiltradas: ModelAsignatura[] = [];
  selectedCurso: number | null = null;
  selectedAsignatura: number | null = null;
  numeroDeNotas: number | null = null;
  showNotificationsMenu = false;
  notifications = ['Notificación 1', 'Notificación 2', 'Notificación 3'];

  constructor(
    private userService: UserService, 
    private notasService: NotasService, 
    private cursoService: CursoService,
    private asignaturaService: AsignaturaService,
    private promedioService: PromedioService, // Inyecta el servicio de Promedio
    private navController: NavController
  ) {}

  ngOnInit() {
    this.cargarCursos();
    this.cargarAsignaturas();
  }

  irAInicio() {
    this.navController.navigateForward('/inicio');
  }

  cargarCursos() {
    this.cursoService.obtenerTodoCurso().subscribe(cursos => {
      this.cursos = cursos;
    });
  }

  toggleNotificationsMenu() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
  }

  cargarAsignaturas() {
    this.asignaturaService.obtenerTodoAsignatura().subscribe(asignaturas => {
      this.asignaturas = asignaturas;
    });
  }

  onCursoChange() {
    if (this.selectedCurso !== null) {
      this.asignaturasFiltradas = this.asignaturas.filter(asignatura => asignatura.curso === this.selectedCurso);
    } else {
      this.asignaturasFiltradas = [];
    }
  }

  onSubmit() {
    if (this.selectedCurso === null || this.selectedAsignatura === null || this.numeroDeNotas === null) {
      console.error('Uno o más campos son nulos.');
      return;
    }

    this.userService.obtenerTodoAlumno(this.selectedCurso).subscribe(alumnos => {
      alumnos.forEach(alumno => {
        for (let i = 0; i < this.numeroDeNotas!; i++) { // Utiliza el operador de no-null assertion
          this.notasService.agregarNotaAlumnoAsignatura(alumno.rut, this.selectedAsignatura!, 0) // Utiliza el operador de no-null assertion
            .subscribe(response => {
              console.log('Nota agregada:', response);
            });
        }

        // Verifica y agrega promedio si no existe
        this.promedioService.verificarPromedio(alumno.rut, this.selectedAsignatura!).subscribe(existe => {
          if (!existe) {
            this.promedioService.agregarPromedio(alumno.rut, this.selectedAsignatura!, 0).subscribe(
              response => {
                console.log('Promedio agregado:', response);
              },
              error => {
                console.error('Error al agregar promedio:', error);
              }
            );
          } else {
            console.log(`El promedio ya existe para el alumno ${alumno.rut} en la asignatura ${this.selectedAsignatura}`);
          }
        });
      });
    });
  }
}
