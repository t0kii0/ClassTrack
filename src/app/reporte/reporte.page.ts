import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/users/users.service';
import { CursoService } from '../services/curso/curso.service';
import { ModelCurso } from '../modelos/cursoModel';
import { ModelAlumno } from '../modelos/userModel';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  searchCriteria = {
    rut: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    curso: null
  };

  cursos: ModelCurso[] = []; // Lista de cursos
  resultados: ModelAlumno[] = []; // Resultados de la búsqueda

  constructor(
    private alertController: AlertController,
    private alumnosService: UserService,
    private cursoService: CursoService // Servicio para obtener los cursos
  ) { }

  ngOnInit() {
    this.cargarCursos();
  }

  cargarCursos() {
    this.cursoService.obtenerTodoCurso().subscribe(
      (cursos: ModelCurso[]) => {
        this.cursos = cursos;
      },
      error => {
        console.error('Error al cargar cursos:', error);
      }
    );
  }

  buscarAlumnos() {
    this.alumnosService.buscarAlumnos(this.searchCriteria).subscribe(
      (resultados: ModelAlumno[]) => {
        this.resultados = resultados;
      },
      error => {
        console.error('Error al buscar alumnos:', error);
      }
    );
  }
}
