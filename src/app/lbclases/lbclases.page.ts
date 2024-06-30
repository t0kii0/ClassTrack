import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModelAlumno } from '../modelos/userModel';
import { UserService } from '../services/users/users.service';
import { NotasService } from '../services/nota/nota.service';
import { NotificacionService } from '../services/notificaciones/notificacion.service'; // Importa el servicio de notificaciones
import { ModelNota } from '../modelos/notamodel';
import { ModelNotificacion } from '../modelos/notificacionModel'; // Importa el modelo de notificación
import { PromedioService } from '../services/promedio/promedio.service';
import { AsignaturaService } from '../services/asignatura/asignatura.service';

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
  showNotificationsMenu = false;
  notifications: string[] = [];
  alumnos: ModelAlumno[] = [];
  alumnosConNotas: AlumnoNotas[] = [];
  idAsignatura?: number;
  idCurso?: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private alumnosService: UserService,
    private notasService: NotasService,
    private notificationService: NotificacionService, // Inyecta el servicio de notificaciones
    private promedioService: PromedioService,
    private asignaturaService: AsignaturaService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.idAsignatura = +params['asignaturaId'];
      this.idCurso = +params['cursoId'];
      this.cargarAlumnos();
    });
  }
  
  toggleNotificationsMenu() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
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
            this.verificarNotasBajas(alumnoConNotas);
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
      this.verificarNotasBajas(alumnoConNotas);
    } else {
      this.errorMessages[alumnoConNotas.alumno.id][index] = 'La nota debe estar entre 10 y 70';
    }
  }

  calcularPromedio(alumnoConNotas: AlumnoNotas) {
    const notasValidas = alumnoConNotas.notas.map(n => n.nota).filter(nota => nota >= 10 && nota <= 70);//para calcular el promedio la funcion solo toma valores enteros entre 10 y 70
    const suma = notasValidas.reduce((a, b) => a + b, 0);
    alumnoConNotas.promedio = notasValidas.length > 0 ? Math.round(suma / notasValidas.length) : 0;
    return alumnoConNotas.promedio;
  }

  verificarNotasBajas(alumnoConNotas: AlumnoNotas) {
    const notasBajas = alumnoConNotas.notas.filter(notaObj => notaObj.nota < 40).length;
    if (notasBajas >= 3) {
      const mensaje = `El alumno ${alumnoConNotas.alumno.nombre} tiene ${notasBajas} notas menores a 40.`;
      this.notifications.push(mensaje);
      this.showNotificationsMenu = true;

      // Crear y enviar notificaciones para PSICOPEDAGOGO y ADMIN
      const roles = ['PSICOPEDAGOGO', 'ADMIN'];
      roles.forEach(rol => {
        const notification: ModelNotificacion = {
          mensaje: mensaje,
          rol: rol,
          
          fecha: new Date()
        };
        this.notificationService.sendNotification(notification).subscribe(
          response => {
            console.log(`Notificación enviada para rol ${rol}:`, response);
          },
          error => {
            console.error('Error al enviar notificación:', error);
          }
        );
      });
    }
  }

  guardarCambios() {
    this.alumnosConNotas.forEach(alumnoConNotas => {
      // Actualizar notas del alumno
      alumnoConNotas.notas.forEach(notaObj => {
        if (notaObj.nota >= 10 && notaObj.nota <= 70) {
          if (notaObj.id) {
            this.notasService.actualizarNotaAlumnoAsignatura(notaObj.id, notaObj.nota).subscribe(
              response => {
                console.log(`Nota actualizada para ${alumnoConNotas.alumno.rut}: ${notaObj.nota}`);
              },
              error => {
                console.error('Error al actualizar la nota:', error);
              }
            );
          }
        }
      });
  
      // Actualizar el promedio después de guardar las notas
      this.promedioService.verificarPromedio(alumnoConNotas.alumno.rut, this.idAsignatura!).subscribe(
        existe => {
          if (existe) {
            this.promedioService.actualizarPromedio(alumnoConNotas.alumno.rut, this.idAsignatura!, alumnoConNotas.promedio).subscribe(
              response => {
                console.log(`Promedio actualizado para ${alumnoConNotas.alumno.rut}: ${alumnoConNotas.promedio}`);
              },
              error => {
                console.error('Error al actualizar el promedio:', error);
              }
            );
          } else {
            console.warn(`No se encontró un promedio para el alumno ${alumnoConNotas.alumno.rut} en la asignatura ${this.idAsignatura}`);
          }
        },
        error => {
          console.error('Error al verificar el promedio:', error);
        }
      );
    });

    // Calcular y actualizar el promedio del curso
    const promedioCurso = this.calcularPromedioCurso();
    this.asignaturaService.actualizarPromedioCurso(this.idAsignatura!, promedioCurso).subscribe(
      response => {
        console.log(`Promedio del curso actualizado para la asignatura ${this.idAsignatura}: ${promedioCurso}`);
      },
      error => {
        console.error('Error al actualizar el promedio del curso:', error);
      }
    );

    // Activar notificación después de guardar cambios
    const mensaje = 'Alumno tiene notas baja a 4 ';
    const roles = ['ADMIN', 'PSICOPEDAGOGO'];
    roles.forEach(rol => {
      const notification: ModelNotificacion = {
        mensaje: mensaje,
        rol: rol,
        fecha: new Date()
      };
      this.notificationService.sendNotification(notification).subscribe(
        response => {
          console.log(`Notificación de guardado enviada para rol ${rol}:`, response);
          // Puedes mostrar una alerta al usuario si es necesario
          this.alertController.create({
            header: 'Éxito',
            message: mensaje,
            buttons: ['OK']
          }).then(alert => alert.present());
        },
        error => {
          console.error('Error al enviar notificación de guardado:', error);
        }
      );
    });
  }

  calcularPromedioCurso(): number {
    const promedios = this.alumnosConNotas.map(alumnoConNotas => alumnoConNotas.promedio).filter(prom => prom > 0);
    const sumaPromedios = promedios.reduce((a, b) => a + b, 0);
    return promedios.length > 0 ? Math.round(sumaPromedios / promedios.length) : 0;
  }
}
