import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth/data-access/auth.service';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage  implements OnInit {
  showNotificationsMenu = false;
  notifications = ['Notificación 1', 'Notificación 2', 'Notificación 3']; // Ejemplo de notificaciones
  opcionSeleccionada: string = '';
  userEmail: string = '';
  

  constructor( private router : Router, private authService : AuthService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo() {
    try {
      const session = await this.authService.session();
      if (session?.data?.session?.user?.email) {
        this.userEmail = session.data.session.user.email;
      }
    } catch (error) {
      console.error('Error obteniendo la sesión del usuario:', error);
    }
  }
  irAInicio() {
    // Redirige a la página de inicio
    this.router.navigate(['/inicio']);
  }
  toggleNotificationsMenu() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
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
    this.opcionSeleccionada = 'menu-informes';
    this.router.navigate(['/menu-informes']);
    console.log(this.opcionSeleccionada);
  }

  configuracion() {
    this.opcionSeleccionada = 'configuracion';
    this.router.navigate(['/configuracion']);
    console.log(this.opcionSeleccionada);
  }

  logOut(){
    this.authService.signOut();
    this.router.navigateByUrl('/auth/log-in')
  }
  
}
