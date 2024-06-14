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

  irAInicio() {
    // Redirige a la página de inicio
    this.router.navigate(['/inicio']);
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

  informes() {
    this.opcionSeleccionada = 'menu-informe';
    this.router.navigate(['/menu-informes']);
    console.log(this.opcionSeleccionada);
  }

  configuracion() {
    this.opcionSeleccionada = 'configuracion';
    this.router.navigate(['/configuracion']);
    console.log(this.opcionSeleccionada);
  }
  
}
