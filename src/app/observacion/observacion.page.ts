import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/users.service';
import { CursoService } from '../services/curso/curso.service';
import { AuthService } from '../auth/data-access/auth.service'; // Importa AuthService
import { ModelAlumno } from '../modelos/userModel';
import { ModelCurso } from '../modelos/cursoModel';
import { ModelAsistente } from '../modelos/asistenteModel'; // Importa ModelAsistente
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ObservacionModalComponent } from '../observacion-modal/observacion-modal.component';
import { AsistenteService } from '../services/asistente/asistente.service';

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
  userEmail: string = '';
  userData: ModelAsistente | null = null;

  constructor(
    private userService: UserService,
    private navController: NavController,
    private courseService: CursoService,
    private modalController: ModalController,
    private asistenteService: AsistenteService,
    private authService: AuthService // Inyecta AuthService
  ) {}

  ngOnInit() {
    this.loadAlumnos();
    this.loadCursos();
    this.getUserInfo();
  }

  toggleNotificationsMenu() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
  }

  irAInicio() {
    this.navController.navigateForward('/inicio');
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

  async getUserInfo() {
    try {
      const session = await this.authService.session();
      if (session?.data?.session?.user?.email) {
        this.userEmail = session.data.session.user.email;
        this.getUserData(this.userEmail);
      }
    } catch (error) {
      console.error('Error obteniendo la sesión del usuario:', error);
    }
  }

  getUserData(email: string) {
    this.asistenteService.obtenerAsistentePorEmail(email).subscribe(
      (asistente) => {
        if (asistente) {
          this.userData = asistente;
          console.log('Datos del asistente:', this.userData);
        } else {
          console.log('No se encontró un asistente con el email:', email);
        }
      },
      (error) => {
        console.error('Error al obtener los datos del asistente:', error);
      }
    );
  }

  async presentModal(idAlumno: string) {
    if (this.userData) {
      const modal = await this.modalController.create({
        component: ObservacionModalComponent,
        componentProps: {
          idAlumno,
          autor: this.userData // Pasa el usuario como autor
        },
      });
      return await modal.present();
    } else {
      console.error('No se pudo obtener la información del autor.');
    }
  }
}
