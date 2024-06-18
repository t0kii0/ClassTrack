import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/users.service';
import { CursoService } from '../services/curso/curso.service';
import { NotasService } from '../services/nota/nota.service';
import { ModelAlumno } from '../modelos/userModel';
import { ModelNota } from '../modelos/notamodel';
import { ModelAsignatura } from '../modelos/asignaturaModel';
import { Router, ActivatedRoute } from '@angular/router';
import { AsignaturaService } from '../services/asignatura/asignatura.service';
import { ModelCurso } from '../modelos/cursoModel';

@Component({
  selector: 'app-ver-notas',
  templateUrl: './ver-notas.page.html',
  styleUrls: ['./ver-notas.page.scss'],
})
export class VerNotasPage implements OnInit {
  rut: string | null = null;
  cursos: ModelCurso[] = [];
  notasAgrupadas: { [key: string]: ModelNota[] } = {};
  filteredAlumnos: (ModelAlumno & { curso?: ModelCurso })[] = [];
  searchTerm: string = '';
  selectedCurso: string = '';
  nombre: string = ''; // Assuming you have a way to get the student's name
  curso: string = ''; // Assuming you have a way to get the student's course
  asignaturas: ModelAsignatura[] = []; // Array para almacenar las asignaturas

  constructor(
    private userService: UserService,
    private cursoService: CursoService,
    private notasService: NotasService,
    private asignaturaService: AsignaturaService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.rut = params.get('rut');
      if (this.rut) {
        console.log(this.rut);
        this.cargarAsignaturasYNotas(this.rut);
      } else {
        console.error('RUT no encontrado en la URL');
      }
    });
  }

  cargarAsignaturasYNotas(rut: string) {
    this.asignaturaService.obtenerTodoAsignatura().subscribe(asignaturas => {
      this.asignaturas = asignaturas;
      this.cargarNotas(rut);
    });
  }

  cargarNotas(rut: string) {
    this.notasService.obtenerNotasPorAlumno(rut).subscribe(
      (notas: ModelNota[]) => {
        this.notasAgrupadas = this.agruparNotasPorAsignatura(notas);
        console.log('Notas obtenidas:', notas);
      },
      (error) => {
        console.error('Error al obtener las notas:', error);
      }
    );
  }

  agruparNotasPorAsignatura(notas: ModelNota[]): { [key: string]: ModelNota[] } {
    const notasAgrupadas: { [key: string]: ModelNota[] } = {};

    notas.forEach((nota) => {
      const asignatura = this.asignaturas.find(a => a.id === nota.id_asignatura);
      const nombreAsignatura = asignatura ? asignatura.nombre_asignatura : 'Desconocida';

      if (!notasAgrupadas[nombreAsignatura]) {
        notasAgrupadas[nombreAsignatura] = [];
      }
      notasAgrupadas[nombreAsignatura].push(nota);
    });

    return notasAgrupadas;
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
