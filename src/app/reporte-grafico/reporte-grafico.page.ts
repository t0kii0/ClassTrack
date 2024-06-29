import { Component, OnInit } from '@angular/core';
import { CursoService } from '../services/curso/curso.service';
import { ModelCurso } from '../modelos/cursoModel';
import { AsignaturaService } from '../services/asignatura/asignatura.service';
import { ModelAsignatura } from '../modelos/asignaturaModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte-grafico',
  templateUrl: './reporte-grafico.page.html',
  styleUrls: ['./reporte-grafico.page.scss'],
})
export class ReporteGraficoPage implements OnInit {
  showNotificationsMenu = false;
  notifications = ['Notificación 1', 'Notificación 2', 'Notificación 3'];
  cursos: ModelCurso[] = [];

  constructor(
    private cursoService: CursoService,
    private asignaturaService: AsignaturaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCursos();
  }

  toggleNotificationsMenu() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
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

  verPromedios(curso: ModelCurso) {
    this.router.navigate(['/ver-grafico'], { queryParams: { cursoId: curso.id_curso } });
  }
}
