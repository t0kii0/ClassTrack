import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/users.service';
import { CursoService } from '../services/curso/curso.service';
import { NotasService } from '../services/nota/nota.service';
import { AsignaturaService } from '../services/asignatura/asignatura.service';
import { ModelCurso } from '../modelos/cursoModel';
import { ModelAlumno } from '../modelos/userModel';
import { ModelNota } from '../modelos/notamodel';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ModelAsignatura } from '../modelos/asignaturaModel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  showNotificationsMenu = false;
  notifications = ['Notificación 1', 'Notificación 2', 'Notificación 3']; // Ejemplo de notificaciones
  alumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  cursos: ModelCurso[] = [];
  filteredAlumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  searchTerm: string = '';
  selectedCurso: string = '';

  constructor(
    private userService: UserService,
    private cursoService: CursoService,
    private navController: NavController,
    private notasService: NotasService,
    private asignaturaService: AsignaturaService,
    private router: Router
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
        this.alumnos = alumnos;
        this.filteredAlumnos = alumnos;
      },
      error => {
        console.error('Error al cargar alumnos:', error);
      }
    );
  }

  loadCursos() {
    this.cursoService.obtenerTodoCurso().subscribe(
      cursos => {
        this.cursos = cursos;
      },
      error => {
        console.error('Error al cargar cursos:', error);
      }
    );
  }

  filterAlumnos() {
    const searchTermLower = this.searchTerm.toLowerCase();
    const selectedCursoLower = this.selectedCurso.toLowerCase();

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

      return matchesSearchTerm && matchesSelectedCurso;
    });
  }

  presentModal(rut: string) {
    this.userService.obtenerAlumnoPorRut(rut).subscribe(alumno => {
      this.notasService.obtenerNotasPorAlumno(alumno.rut).subscribe((notas: ModelNota[]) => {
        this.asignaturaService.obtenerTodoAsignatura().subscribe((asignaturas: ModelAsignatura[]) => {
          this.generarPDF(alumno, notas, asignaturas);
        });
      });
    });
  }
  irAInicio() {
    this.navController.navigateForward('/inicio');
  }

  generarPDF(alumno: ModelAlumno, notas: ModelNota[], asignaturas: ModelAsignatura[]) {
    const doc = new jsPDF();
    const imgData = '/assets/reporte.png'; // Ruta de la imagen de fondo

    // Cargar imagen de fondo
    doc.addImage(imgData, 'JPEG', 0, 0, 210, 297); // A4 tamaño en mm

    // Título del informe
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text(`Informe de Notas de ${alumno.nombre} ${alumno.apellido}`, 14, 22);

    // Información del alumno
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`RUT: ${alumno.rut}`, 14, 32);
    doc.text(`Curso: ${alumno.curso?.curso}`, 14, 38);

    // Agrupar notas por asignatura
    const notasPorAsignatura: { [key: string]: number[] } = {};
    notas.forEach(nota => {
      const asignatura = asignaturas.find(a => a.id === nota.id_asignatura);
      const asignaturaNombre = asignatura?.nombre_asignatura || 'Desconocida';
      if (!notasPorAsignatura[asignaturaNombre]) {
        notasPorAsignatura[asignaturaNombre] = [];
      }
      notasPorAsignatura[asignaturaNombre].push(nota.nota);
    });

    // Tabla de notas
    const notasData = Object.keys(notasPorAsignatura).map(asignaturaNombre => [
      asignaturaNombre,
      notasPorAsignatura[asignaturaNombre].join(', ')
    ]);

    (doc as any).autoTable({
      head: [['Asignatura', 'Notas']],
      body: notasData,
      startY: 50
    });

    doc.save(`reporte_notas_${alumno.rut}.pdf`);
  }

  vernotas(rut: string){
    console.log(rut);
    this.router.navigate(['/ver-notas', rut]);
  }
}
