import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/users.service';
import { CursoService } from '../services/curso/curso.service';
import { NotasService } from '../services/nota/nota.service';
import { ModelAlumno } from '../modelos/userModel';
import { ModelNota } from '../modelos/notamodel';
import { ModelAsignatura } from '../modelos/asignaturaModel';
import { Router } from '@angular/router';
import { AsignaturaService } from '../services/asignatura/asignatura.service';
import { ModelCurso } from '../modelos/cursoModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-notas',
  templateUrl: './ver-notas.page.html',
  styleUrls: ['./ver-notas.page.scss'],
})
export class VerNotasPage implements OnInit {
  rut: string | null = null;
  cursos: ModelCurso[] = [];
  notas: ModelNota[] = [];
  filteredAlumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  searchTerm: string = '';
  selectedCurso: string = '';
  nombre: string = ''; // Assuming you have a way to get the student's name
  curso: string = ''; // Assuming you have a way to get the student's course

  constructor(
    private userService: UserService,
    private cursoService: CursoService,
    private notasService: NotasService,
    private asignaturaService: AsignaturaService,
    private router: Router,
    private route : ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.rut = params.get('rut');
      if (this.rut) {
        console.log(this.rut);
        this.cargarNotas(this.rut);
      } else {
        console.error('RUT no encontrado en la URL');
      }
    });
  }

  cargarNotas(rut: string) {
    this.notasService.obtenerNotasPorAlumno(rut).subscribe(
      (notas: ModelNota[]) => {
        this.notas = notas; // Asignar las notas a la variable `notas`
        console.log('Notas obtenidas:', notas);
      },
      (error) => {
        console.error('Error al obtener las notas:', error);
      }
    );
  }
}
