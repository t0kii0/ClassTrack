import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/users.service';
import { NotasService } from '../services/nota/nota.service';
import { CursoService } from '../services/curso/curso.service';
import { AsignaturaService } from '../services/asignatura/asignatura.service';
import { ModelCurso } from '../modelos/cursoModel';
import { ModelAsignatura } from '../modelos/asignaturaModel';

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

  constructor(
    private userService: UserService, 
    private notasService: NotasService, 
    private cursoService: CursoService,
    private asignaturaService: AsignaturaService
  ) {}

  ngOnInit() {
    this.cargarCursos();
    this.cargarAsignaturas();
  }

  cargarCursos() {
    this.cursoService.obtenerTodoCurso().subscribe(cursos => {
      this.cursos = cursos;
    });
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
      });
    });
  }
}
