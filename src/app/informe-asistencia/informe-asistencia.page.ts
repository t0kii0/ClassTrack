import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from '../services/curso/curso.service';
import { UserService } from '../services/users/users.service';
import { AsistenciaService } from '../services/asistencia/asistencia.service';
import { ModelAlumno } from '../modelos/userModel';
import { ModelCurso } from '../modelos/cursoModel';
import { ModelAsistencia } from '../modelos/asistenciaModel';
import { jsPDF } from 'jspdf'; // Importar jsPDF

@Component({
  selector: 'app-informe-asistencia',
  templateUrl: './informe-asistencia.page.html',
  styleUrls: ['./informe-asistencia.page.scss'],
})
export class InformeAsistenciaPage implements OnInit {

  alumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  cursos: ModelCurso[] = [];
  filteredAlumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  searchTerm: string = '';
  selectedCurso: string = '';

  constructor(
    private userService: UserService,
    private cursoService: CursoService,
    private asistenciaService: AsistenciaService, // Inyectar el servicio de observaciones
    private router: Router
  ) { }

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
      this.asistenciaService.obtenerTodaAsistencia().subscribe((observaciones: ModelAsistencia[]) => {
        const observacionesDelAlumno = observaciones.filter(obs => obs.id_alumno === rut);
        this.generarPDF(alumno, observacionesDelAlumno);
      });
    });
  }

  verAsistencia(rut: string) {
    this.userService.obtenerAlumnoPorRut(rut).subscribe(alumno => {
      this.asistenciaService.obtenerTodaAsistencia().subscribe((observaciones: ModelAsistencia[]) => {
        const observacionesDelAlumno = observaciones.filter(obs => obs.id_alumno === rut);
        const uniqueDates = new Set(observacionesDelAlumno.map(obs => new Date(obs.fecha_asis).toDateString()));
        const totalDias = uniqueDates.size;

        const asistenciasPorFecha: Record<string, boolean> = {};

        observacionesDelAlumno.forEach(obs => {
          const fechaStr = new Date(obs.fecha_asis).toDateString();
          if (!asistenciasPorFecha[fechaStr]) {
            asistenciasPorFecha[fechaStr] = obs.asistio;
          } else {
            asistenciasPorFecha[fechaStr] = asistenciasPorFecha[fechaStr] || obs.asistio;
          }
        });

        const diasAsistidos = Object.values(asistenciasPorFecha).filter(asistio => asistio).length;
        const porcentajeAsistencia = totalDias > 0 ? (diasAsistidos / totalDias) * 100 : 0;

        this.router.navigate(['/ver-asistencia'], {
          state: {
            alumno,
            totalDias,
            diasAsistidos,
            porcentajeAsistencia
          }
        });
      });
    });
  }

  generarPDF(alumno: ModelAlumno, observaciones: ModelAsistencia[]) {
    const uniqueDates = new Set(observaciones.map(obs => new Date(obs.fecha_asis).toDateString()));
    const totalDias = uniqueDates.size;

    // Definir el tipo del objeto asistenciasPorFecha
    const asistenciasPorFecha: Record<string, boolean> = {};

    // Filtrar los días asistidos únicos
    observaciones.forEach(obs => {
      const fechaStr = new Date(obs.fecha_asis).toDateString();
      if (!asistenciasPorFecha[fechaStr]) {
        asistenciasPorFecha[fechaStr] = obs.asistio;
      } else {
        asistenciasPorFecha[fechaStr] = asistenciasPorFecha[fechaStr] || obs.asistio;
      }
    });

    const diasAsistidos = Object.values(asistenciasPorFecha).filter(asistio => asistio).length;
    const porcentajeAsistencia = totalDias > 0 ? (diasAsistidos / totalDias) * 100 : 0;

    const doc = new jsPDF();

    doc.text(`Informe de Asistencia para ${alumno.nombre} ${alumno.apellido}`, 10, 10);
    doc.text(`RUT: ${alumno.rut}`, 10, 20);
    doc.text(`Curso: ${alumno.curso?.curso}`, 10, 30);
    doc.text(`Total de Días: ${totalDias}`, 10, 40);
    doc.text(`Días Asistidos: ${diasAsistidos}`, 10, 50);
    doc.text(`Porcentaje de Asistencia: ${porcentajeAsistencia.toFixed(2)}%`, 10, 60);

    doc.save(`Informe_Asistencia_${alumno.rut}.pdf`);
  }
}
