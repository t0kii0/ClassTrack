import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/users.service';
import { CursoService } from '../services/curso/curso.service';
import { ModelAlumno } from '../modelos/userModel';
import { ModelCurso } from '../modelos/cursoModel';
import { ModalController } from '@ionic/angular';
import { ObservacionModalComponent } from '../observacion-modal/observacion-modal.component';

@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.page.html',
  styleUrls: ['./observacion.page.scss'],
})
export class ObservacionPage implements OnInit {
  showNotificationsMenu = false;
  notifications = ['Notificación 1', 'Notificación 2', 'Notificación 3']; // Ejemplo de notificaciones
  alumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  cursos: ModelCurso[] = [];
  filteredAlumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  searchTerm: string = '';
  selectedCurso: string = '';

  constructor(
    private userService: UserService,
    private courseService: CursoService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadAlumnos();
    this.loadCursos();
  }
  toggleNotificationsMenu() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
  }

  loadAlumnos() {
    this.userService.obtenerAlumnosConCurso().subscribe(
      alumnos => {
        console.log('Datos de alumnos obtenidos:', alumnos); // Debugging
        this.alumnos = alumnos;
        this.filteredAlumnos = alumnos;

        // Verificar si los cursos están correctamente asignados
        this.alumnos.forEach(alumno => {
          console.log('Alumno:', alumno.nombre, 'Curso:', alumno.curso?.curso);
        });
      },
      error => {
        console.error('Error al cargar alumnos:', error);
      }
    );
  }

  loadCursos() {
    this.courseService.obtenerTodoCurso().subscribe(
      cursos => {
        this.cursos = cursos;
        console.log('Cursos cargados:', this.cursos); // Debugging
      },
      error => {
        console.error('Error al cargar cursos:', error);
      }
    );
  }

  filterAlumnos() {
    const searchTermLower = this.searchTerm.toLowerCase();
    const selectedCursoLower = this.selectedCurso.toLowerCase();

    console.log('Filtro de búsqueda:', searchTermLower);
    console.log('Curso seleccionado:', selectedCursoLower);

    this.filteredAlumnos = this.alumnos.filter(alumno => {
      const rut = alumno.rut?.toLowerCase() || '';
      const nombre = alumno.nombre?.toLowerCase() || '';
      const apellido = alumno.apellido?.toLowerCase() || '';
      const apmaterno = alumno.apmaterno?.toLowerCase() || '';
      const cursoNombre = alumno.curso?.curso?.toLowerCase() || '';

      const matchesSearchTerm =
        rut.includes(searchTermLower) ||
        nombre.includes(searchTermLower) ||
        apellido.includes(searchTermLower) ||
        apmaterno.includes(searchTermLower);

      const matchesSelectedCurso = !selectedCursoLower || cursoNombre === selectedCursoLower;

      console.log(`Alumno: ${nombre} ${apellido}, Curso: ${cursoNombre}, matchesSearchTerm: ${matchesSearchTerm}, matchesSelectedCurso: ${matchesSelectedCurso}`);

      return matchesSearchTerm && matchesSelectedCurso;
    });

    console.log('Alumnos filtrados:', this.filteredAlumnos);
  }

  async presentModal(idAlumno: string) {
    const modal = await this.modalController.create({
      component: ObservacionModalComponent,
      componentProps: { idAlumno },
    });
    return await modal.present();
  }
}
