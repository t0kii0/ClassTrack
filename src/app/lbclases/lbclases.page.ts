import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModelAlumno } from '../modelos/userModel';
import { UserService } from '../services/users/users.service';
import { NotasService } from '../services/nota/nota.service';
import { ModelNota } from '../modelos/notamodel';

interface AlumnoNotas {
  alumno: ModelAlumno;
  notas: number[];
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
  numeroDeNotas: number = 12;

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
    // Redirige a la página de inicio
    this.router.navigate(['/inicio']);
  }

  cargarAlumnos() {
    if (this.idCurso !== undefined) {
      this.alumnosService.obtenerTodoAlumno(this.idCurso).subscribe(
        (alumnos: ModelAlumno[]) => {
          this.alumnos = alumnos;
          this.alumnosConNotas = alumnos.map(alumno => ({
            alumno: alumno,
            notas: new Array(this.numeroDeNotas).fill(0),
            promedio: 0
          }));
          this.updateNumeroDeNotas(this.numeroDeNotas);
        },
        error => {
          console.error('Error al cargar alumnos:', error);
        }
      );
    }
  }

  async verDetallesAlumno(alumno: ModelAlumno) {
    this.notasService.obtenerNotasPorAlumno(alumno.rut).subscribe(
      (notas: ModelNota[]) => {
        const alumnoConNotas = this.alumnosConNotas.find(an => an.alumno.rut === alumno.rut);
        if (alumnoConNotas) {
          alumnoConNotas.notas = notas.map(n => n.nota);
          alumnoConNotas.promedio = this.calcularPromedio(alumnoConNotas);
        }
        this.presentAlumnoDetailsAlert(alumno, notas, alumnoConNotas?.promedio ?? 0);
      },
      error => {
        console.error('Error al obtener notas del alumno:', error);
      }
    );
  }

  async presentAlumnoDetailsAlert(alumno: ModelAlumno, notas: ModelNota[], promedio: number) {
    const alert = await this.alertController.create({
      header: 'Detalles del Alumno',
      message: `
        <strong>Nombre:</strong> ${alumno.nombre}<br>
        <strong>Apellido Paterno:</strong> ${alumno.apellido}<br>
        <strong>Apellido Materno:</strong> ${alumno.apmaterno}<br>
        <strong>Notas:</strong> ${notas.length ? notas.map(n => n.nota).join(', ') : 'N/A'}<br>
        <strong>Promedio:</strong> ${promedio}
      `,
      buttons: ['Cerrar']
    });

    await alert.present();
  }

  async agregarNotaAlumno(rutAlumno: string) {
    const alert = await this.alertController.create({
      header: 'Agregar Nota',
      inputs: [
        {
          name: 'nota',
          type: 'number',
          placeholder: 'Ingrese la nota',
          min: 1,
          max: 70
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: async (data) => {
            const nota = parseInt(data.nota, 10);
            if (!isNaN(nota) && nota >= 1 && nota <= 70) {
              const idAsignatura = this.route.snapshot.queryParams['asignaturaId']; // Obtener el ID de la asignatura de los parámetros de consulta
              this.notasService.agregarNotaAlumnoAsignatura(rutAlumno, idAsignatura, nota).subscribe(
                () => {
                  this.cargarAlumnos();
                },
                error => {
                  console.error('Error al agregar nota:', error);
                }
              );
            } else {
              console.error('Nota inválida:', nota);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  updateNumeroDeNotas(count: number) {
    this.numeroDeNotas = count;
    this.alumnosConNotas.forEach((an) => {
      an.notas = new Array(count).fill(0);
      this.calcularPromedio(an);
    });
  }

  updateNota(alumnoConNotas: AlumnoNotas, index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const nota = parseInt(input.value, 10);
    if (nota < 10 || nota > 70) return;
    alumnoConNotas.notas[index] = nota;
    this.calcularPromedio(alumnoConNotas);
  }

  calcularPromedio(alumnoConNotas: AlumnoNotas) {
    const notaValida = alumnoConNotas.notas.filter((g) => g >= 10 && g <= 70);
    const sum = notaValida.reduce((a, b) => a + b, 0);
    alumnoConNotas.promedio = notaValida.length > 0 ? Math.round(sum / notaValida.length) : 0;
    return alumnoConNotas.promedio;
  }
}
