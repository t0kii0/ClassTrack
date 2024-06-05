import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/users.service';
import { CursoService } from '../services/curso/curso.service';
import { NotasService } from '../services/nota/nota.service';
import { AsignaturaService } from '../services/asignatura/asignatura.service';
import { ModelCurso } from '../modelos/cursoModel';
import { ModelAlumno } from '../modelos/userModel';
import { ModelNota } from '../modelos/notamodel';
import { ModelAsignatura } from '../modelos/asignaturaModel';
import jsPDF from 'jspdf';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.page.html',
  styleUrls: ['./reporte.page.scss'],
})
export class ReportePage implements OnInit {
  alumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  cursos: ModelCurso[] = [];
  filteredAlumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  searchTerm: string = '';
  selectedCurso: string = '';

  constructor(
    private userService: UserService,
    private cursoService: CursoService,
    private notasService: NotasService,
    private asignaturaService: AsignaturaService
  ) {}

  ngOnInit() {
    this.loadAlumnos();
    this.loadCursos();
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

  generarPDF(alumno: ModelAlumno, notas: ModelNota[], asignaturas: ModelAsignatura[],) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Reporte de Notas', 10, 10);
    doc.setFontSize(12);
    doc.text(`Alumno: ${alumno.nombre} ${alumno.apellido} ${alumno.apmaterno}`, 10, 20);
    doc.text(`RUT: ${alumno.rut}`, 10, 30);
    doc.text(`Curso: ${alumno.curso}`, 10, 40);

    let yPosition = 50;
    notas.forEach(nota => {
      const asignatura = asignaturas.find(a => a.id === nota.id_asignatura);
      doc.text(`Asignatura: ${asignatura?.nombre_asignatura || 'Desconocida'} - Nota: ${nota.nota}`, 10, yPosition);
      yPosition += 10;
    });

    doc.save(`reporte_${alumno.rut}.pdf`);
  }
}
