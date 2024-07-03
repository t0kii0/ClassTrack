import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { ModelAlumno } from '../modelos/userModel';
import { ModelCurso } from '../modelos/cursoModel';
import { UserService } from '../services/users/users.service';
import { CursoService } from '../services/curso/curso.service';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ObservacionService } from '../services/Observacion/observacion.service'; // Importar el servicio de observaciones
import { ModelObservacion } from '../modelos/observacionModel'; // Importar el modelo de observaciones
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importar jspdf-autotable

@Component({
  selector: 'app-informe-observacion',
  templateUrl: './informe-observacion.page.html',
  styleUrls: ['./informe-observacion.page.scss'],
})
export class InformeObservacionPage implements OnInit {

  alumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  cursos: ModelCurso[] = [];
  filteredAlumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  searchTerm: string = '';
  selectedCurso: string = '';

  constructor(
    private userService: UserService,
    private navController: NavController,
    private cursoService: CursoService,
    private observacionService: ObservacionService, // Inyectar el servicio de observaciones
    private router: Router // Inyectar el router
  ) {}

  ngOnInit() {
    this.loadAlumnos();
    this.loadCursos();
  }
  irAInicio() {
    this.navController.navigateForward('/inicio');
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
      this.observacionService.obtenerTodaObservacion().subscribe((observaciones: ModelObservacion[]) => {
        const observacionesDelAlumno = observaciones.filter(obs => obs.id_alumno === rut);
        this.generarPDF(alumno, observacionesDelAlumno);
      });
    });
  }

  verObservaciones(rut: string) {
    console.log(rut);
    this.router.navigate(['/ver-observaciones', rut]); 
  }

  generarPDF(alumno: ModelAlumno, observaciones: ModelObservacion[]) {
    const doc = new jsPDF();
    const imgData = '/assets/reporte.png'; // Ruta de la imagen de fondo

    // Cargar imagen de fondo
    doc.addImage(imgData, 'JPEG', 0, 0, 210, 297); // A4 tamaño en mm
    
    doc.setFontSize(18);
    doc.text(`Informe de Observaciones de ${alumno.nombre} ${alumno.apellido}`, 14, 22);

    // Información del alumno
    doc.setFontSize(11);
    doc.setTextColor(100);

    // Tabla de observaciones
    const observacionesData = observaciones.map((observacion, index) => [
      `${index + 1}`,
      observacion.observacion,
      observacion.autor,
      observacion.fecha
    ]);

    (doc as any).autoTable({
      head: [['#', 'Observación', 'Autor', 'Fecha']],
      body: observacionesData,
      startY: 30
    });

    

    // Descargar el PDF
    doc.save(`informe_observacion_${alumno.rut}.pdf`);
  }
}
