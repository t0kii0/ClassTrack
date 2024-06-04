import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage  implements OnInit {
  opcionSeleccionada: string = '';

  constructor( private router : Router) { }

  ngOnInit() {
  }
  irACurso(opcion: string) {
    this.opcionSeleccionada = opcion;
    this.router.navigate(['/cursos'], { queryParams: {opcion: opcion} });
    console.log(opcion);
  }

    // Métodos para manejar clics en los íconos
  observacion() {
    this.opcionSeleccionada = 'observacion';
    this.router.navigate(['/observacion']);
    console.log(this.opcionSeleccionada);
  }

  reporte() {
    this.opcionSeleccionada = 'reporte';
    this.router.navigate(['/reporte']);
    console.log(this.opcionSeleccionada);
  }

  configuracion() {
    this.opcionSeleccionada = 'configuracion';
    this.router.navigate(['/configuracion']);
    console.log(this.opcionSeleccionada);
  }
  
}
