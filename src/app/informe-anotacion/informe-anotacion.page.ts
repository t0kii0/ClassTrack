import { Component, OnInit } from '@angular/core';
import { ModelAlumno } from '../modelos/userModel';
import { ModelCurso } from '../modelos/cursoModel';
import { UserService } from '../services/users/users.service';
import { CursoService } from '../services/curso/curso.service';
import { AnotacionService } from '../services/anotacion/anotacion.service';
import { Router } from '@angular/router';
import { ModelAnotacion } from '../modelos/anotacionModel';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Usar la tabla auto generada

@Component({
  selector: 'app-informe-anotacion',
  templateUrl: './informe-anotacion.page.html',
  styleUrls: ['./informe-anotacion.page.scss'],
})
export class InformeAnotacionPage implements OnInit {
  alumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  cursos: ModelCurso[] = [];
  filteredAlumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  searchTerm: string = '';
  selectedCurso: string = '';

  constructor(
    private userService: UserService,
    private navController: NavController,
    private cursoService: CursoService,
    private anotacionService: AnotacionService,
    private router: Router
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
      this.anotacionService.obtenerTodaAnotacion().subscribe((anotaciones: ModelAnotacion[]) => {
        const anotacionesDelAlumno = anotaciones.filter(obs => obs.id_alumno === rut);
        this.generarPDF(alumno, anotacionesDelAlumno);
      });
    });
  }

  verAnotaciones(rut: string) {
    this.router.navigate(['/ver-anotacion', rut]);
  }

  generarPDF(alumno: ModelAlumno, anotaciones: ModelAnotacion[]) {
    const doc = new jsPDF();

    const imgData = '/assets/reporte.png'; // Ruta de la imagen de fondo

    // Cargar imagen de fondo
    doc.addImage(imgData, 'JPEG', 0, 0, 210, 297); // A4 tamaño en mm

    // Título del informe
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text(`Informe de Anotaciones de ${alumno.nombre} ${alumno.apellido}`, 14, 22);

    // Información del alumno
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`RUT: ${alumno.rut}`, 14, 32);
    doc.text(`Curso: ${alumno.curso?.curso}`, 14, 38);

    // Tabla de anotaciones
    const anotacionesData = anotaciones.map(anotacion => [
      anotacion.fecha,
      anotacion.motivo,
      anotacion.id_asignatura
    ]);

    (doc as any).autoTable({
      head: [['Fecha', 'Motivo', 'Asignatura']],
      body: anotacionesData,
      startY: 50
    });

    // Firma del director (si es necesario)
    // const signatureData = '/assets/firma_director.png'; // Ruta de la firma del director
    // doc.addImage(signatureData, 'PNG', 10, 250, 50, 30); // Ajustar posición y tamaño según necesites

    doc.save(`informe_anotaciones_${alumno.rut}.pdf`);
  }
}
