import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsignaturaService } from '../services/asignatura/asignatura.service';
import { UserService } from '../services/users/users.service';
import { AsistenciaService } from '../services/asistencia/asistencia.service';
import { ModelAsignatura } from '../modelos/asignaturaModel';
import { ModelAlumnoExtendido } from '../modelos/userModel';
import { Chart } from 'chart.js/auto';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-ver-grafico',
  templateUrl: './ver-grafico.page.html',
  styleUrls: ['./ver-grafico.page.scss'],
})
export class VerGraficoPage implements OnInit {
  cursoId: number = 0;
  asignaturas: ModelAsignatura[] = [];
  alumnos: (ModelAlumnoExtendido & { curso: { curso: string } })[] = []; // Usar la interfaz extendida
  totalDias: number = 0;

  constructor(
    private route: ActivatedRoute,
    private asignaturaService: AsignaturaService,
    private userService: UserService,
    private asistenciaService: AsistenciaService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.cursoId = params['cursoId'];
      if (this.cursoId) {
        this.cargarAsignaturas();
        this.cargarAlumnos();
        this.cargarTotalDias();
      }
    });
  }

  cargarAsignaturas() {
    this.asignaturaService.obtenerAsignaturasConPromedioPorCurso(this.cursoId).subscribe(
      asignaturas => {
        this.asignaturas = asignaturas;
        this.generarGrafico();
      },
      error => {
        console.error('Error al cargar asignaturas:', error);
      }
    );
  }

  cargarAlumnos() {
    this.userService.obtenerTodoAlumno(this.cursoId).subscribe(
      alumnos => {
        this.alumnos = alumnos;
        this.alumnos.forEach(alumno => {
          this.cargarDiasAsistidos(alumno);
        });
      },
      error => {
        console.error('Error al cargar alumnos:', error);
      }
    );
  }

  cargarTotalDias() {
    this.asistenciaService.obtenerFechasUnicasPorCurso(this.cursoId).subscribe(
      fechas => {
        this.totalDias = fechas.length;
      },
      error => {
        console.error('Error al obtener fechas únicas de asistencia:', error);
      }
    );
  }

  cargarDiasAsistidos(alumno: ModelAlumnoExtendido & { curso: { curso: string } }) {
    this.asistenciaService.obtenerDiasNoAsistidosPorAlumno(alumno.rut).subscribe(
      diasNoAsistidos => {
        alumno.diasAsistidos = this.totalDias - diasNoAsistidos;
        alumno.porcentajeAsistencia = ((alumno.diasAsistidos / this.totalDias) * 100) || 0; // Asignar 0 si el cálculo es NaN o undefined
      },
      error => {
        console.error('Error al obtener días no asistidos:', error);
        alumno.diasAsistidos = 0;
        alumno.porcentajeAsistencia = 0;
      }
    );
  }

  generarGrafico() {
    const ctx = document.getElementById('grafico') as HTMLCanvasElement;
    const labels = this.asignaturas.map(asignatura => asignatura.nombre_asignatura);
    const data = this.asignaturas.map(asignatura => asignatura.prom_curso);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Promedio del Curso',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  generarReporte() {
    const doc = new jsPDF();

    // Cargar logo
    const logo = new Image();
    logo.src = 'assets/logo.png'; // Asegúrate de que esta ruta es correcta

    logo.onload = () => { 
      // Agregar el logo en cada página
      const addLogo = (doc: jsPDF) => {
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.addImage(logo, 'PNG', 185, 3, 20, 20); // Parámetros: (imagen, formato, posición X, posición Y, ancho, altura)
        }
      };

      // Título del reporte
      doc.setFontSize(18);
      doc.text('Reporte de Asistencia', 14, 22);

      // Información del curso
      doc.setFontSize(11);
      doc.setTextColor(100);

      // Tabla de alumnos
      const alumnosData = this.alumnos.map(alumno => [
        alumno.rut,
        alumno.nombre + ' ' + alumno.apellido + ' ' + alumno.apmaterno,
        alumno.curso.curso,
        alumno.diasAsistidos,
        (alumno.porcentajeAsistencia ?? 0) + '%'
      ]);

      (doc as any).autoTable({
        head: [['RUT', 'Nombre Alumno', 'Curso', 'Días Asistidos', 'Porcentaje Asistencia']],
        body: alumnosData,
        startY: 30
      });

      // Generar imagen del gráfico y añadir al PDF
      const canvas = document.getElementById('grafico') as HTMLCanvasElement;
      if (canvas) {
        doc.addPage();
        doc.setFontSize(18);
        doc.text('Gráfico de Promedio del Curso', 14, 22);
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 30, 190, 100);// Parámetros: (imagen, formato, posición X, posición Y, ancho, altura)
      }

      // Agregar logo en cada página
      addLogo(doc);

      // Descargar el PDF
      doc.save('reporte_asistencia.pdf');
    };
  }
}
