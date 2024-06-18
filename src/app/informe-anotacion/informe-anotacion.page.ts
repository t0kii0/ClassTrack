import { Component, OnInit } from '@angular/core';
import { ModelAlumno } from '../modelos/userModel';
import { ModelCurso } from '../modelos/cursoModel';
import { UserService } from '../services/users/users.service';
import { CursoService } from '../services/curso/curso.service';
import { AnotacionService } from '../services/anotacion/anotacion.service';
import { Router } from '@angular/router';
import { ModelAnotacion } from '../modelos/anotacionModel';
import jsPDF from 'jspdf';

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
      private cursoService: CursoService,
      private anotacionService: AnotacionService,
      private router: Router // Inyectar el router
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
        this.anotacionService.obtenerTodaAnotacion().subscribe((anotaciones: ModelAnotacion[]) => {
          const anotacionesDelAlumno = anotaciones.filter(obs => obs.id_alumno === rut);
          this.generarPDF(alumno, anotacionesDelAlumno);
        });
      });
    }
  
    verAnotaciones(rut: string) {
      console.log(rut);
      this.router.navigate(['/ver-anotacion', rut]); 
    }
  
    generarPDF(alumno: ModelAlumno, observaciones: ModelAnotacion[]) {
      const doc = new jsPDF();
  
      doc.text(`Informe de Anotaciones de ${alumno.nombre} ${alumno.apellido}`, 10, 10);
  
      // Agregar observaciones
      doc.text('Anotaciones:', 10, 20);
      observaciones.forEach((anotacion, index) => {
        doc.text(
          `${index + 1}. ${anotacion.motivo} - Autor: ${anotacion.id_asignatura} - Fecha: ${anotacion.fecha}`,
          10,
          30 + (index * 10)
        );
      });
  
      doc.save(`informe_observacion_${alumno.rut}.pdf`);
    }
  }
