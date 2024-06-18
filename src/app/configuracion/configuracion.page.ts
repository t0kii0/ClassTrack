import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  showNotificationsMenu = false;
  notifications = ['Notificación 1', 'Notificación 2', 'Notificación 3']; // Ejemplo de notificaciones

  constructor(private router: Router) { }

  ngOnInit() {} 

  toggleNotificationsMenu() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
  }

  agregar(){
    console.log('entraste.......');
    this.router.navigate(['/crear-user']);
  }

  confiAsignatura(){
    console.log('entraste.......');
    this.router.navigate(['/crear-asignatura']);
  }

  crearDocente(){
    console.log('entraste.......');
    this.router.navigate(['/crear-docente']);
  }

  crearAsistente(){
    console.log('entraste.......');
    this.router.navigate(['/crear-asistente']);
  }

  configNotas(){
    console.log('entraste.......');
    this.router.navigate(['/nota-config']);
  }

  irAInicio() {
    this.router.navigate(['/inicio']);
  }
}
