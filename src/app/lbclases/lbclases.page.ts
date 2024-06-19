// lbclases.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModelAlumno } from '../modelos/userModel';
import { UserService } from '../services/users/users.service';
import { NotasService } from '../services/nota/nota.service';
import { ModelNota } from '../modelos/notamodel';

interface AlumnoNotas {
  alumno: ModelAlumno;
  notas: { id: number | null, nota: number }[];
  promedio: number;
}

@Component({
  selector: 'app-lbclases',
  templateUrl: './lbclases.page.html',
  styleUrls: ['./lbclases.page.scss'],
})
export class LbclasesPage implements OnInit {
  alumnos: ModelAlumno[] = [];
  alumnosConNotas: AlumnoNotas[] = [];
  idAsignatura?: number;
  idCurso?: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private alumnosService: UserService,
    private notasService: NotasService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.idAsignatura = +params['asignaturaId'];
      this.idCurso = +params['cursoId'];
      this.cargarAlumnos();
    });
  }

  irAInicio() {
    this.router.navigate(['/inicio']);
  }

  cargarAlumnos() {
    if (this.idCurso !== undefined) {
      this.alumnosService.obtenerTodoAlumno(this.idCurso).subscribe(
        (alumnos: ModelAlumno[]) => {
          this.alumnos = alumnos;
          this.alumnosConNotas = alumnos.map(alumno => ({
            alumno: alumno,
            notas: [],
            promedio: 0
          }));
          this.cargarNotas();
        },
        error => {
          console.error('Error al cargar alumnos:', error);
        }
      );
    }
  }

  cargarNotas() {
    if (this.idAsignatura !== undefined) {
      this.alumnosConNotas.forEach(alumnoConNotas => {
        this.notasService.obtenerNotasPorAlumnoYAsignatura(alumnoConNotas.alumno.rut, this.idAsignatura!).subscribe(
          (notas: ModelNota[]) => {
            alumnoConNotas.notas = notas.map(nota => ({ id: nota['id'], nota: nota.nota }));
            alumnoConNotas.promedio = this.calcularPromedio(alumnoConNotas);
          },
          error => {
            console.error('Error al cargar notas:', error);
          }
        );
      });
    }
  }

  errorMessages: { [key: number]: string[] } = {};

  updateNota(alumnoConNotas: AlumnoNotas, index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const nota = parseInt(input.value, 10);
    
    if (!this.errorMessages[alumnoConNotas.alumno.id]) {
      this.errorMessages[alumnoConNotas.alumno.id] = [];
    }

    if (!isNaN(nota) && nota >= 10 && nota <= 70) {
      alumnoConNotas.notas[index].nota = nota;
      this.errorMessages[alumnoConNotas.alumno.id][index] = '';
      this.calcularPromedio(alumnoConNotas);
    } else {
      this.errorMessages[alumnoConNotas.alumno.id][index] = 'La nota debe estar entre 10 y 70';
    }
  }

  calcularPromedio(alumnoConNotas: AlumnoNotas) {
    const notasValidas = alumnoConNotas.notas.map(n => n.nota).filter(nota => nota >= 10 && nota <= 70);
    const suma = notasValidas.reduce((a, b) => a + b, 0);
    alumnoConNotas.promedio = notasValidas.length > 0 ? Math.round(suma / notasValidas.length) : 0;
    return alumnoConNotas.promedio;
  }

  guardarCambios() {
    this.alumnosConNotas.forEach(alumnoConNotas => {
      alumnoConNotas.notas.forEach(notaObj => {
        if (notaObj.nota >= 10 && notaObj.nota <= 70) {
          if (notaObj.id) {
            this.notasService.actualizarNotaAlumnoAsignatura(notaObj.id, notaObj.nota).subscribe(
              response => {
                console.log(`Nota actualizada para ${alumnoConNotas.alumno.rut}: ${notaObj.nota}`);
              },
              error => {
                console.error('Error al actualizar nota:', error);
              }
            );
          }
        }
      });
    });
  }
}
