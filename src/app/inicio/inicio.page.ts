import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/data-access/auth.service';
import { AsistenteService } from '../services/asistente/asistente.service'; // Importa el servicio
import { ModelAsistente } from '../modelos/asistenteModel';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  showNotificationsMenu = false;
  notifications = ['Notificación 1', 'Notificación 2', 'Notificación 3'];
  opcionSeleccionada: string = '';
  userEmail: string = '';
  userData: ModelAsistente | null = null; // Datos adicionales del usuario

  constructor(
    private router: Router,
    private authService: AuthService,
    private asistenteService: AsistenteService // Inyecta el servicio
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo() {
    try {
      const session = await this.authService.session();
      if (session?.data?.session?.user?.email) {
        this.userEmail = session.data.session.user.email;
        this.getUserData(this.userEmail); // Llama al método para obtener los datos del asistente
      }
    } catch (error) {
      console.error('Error obteniendo la sesión del usuario:', error);
    }
  }

  getUserData(email: string) {
    this.asistenteService.obtenerAsistentePorEmail(email).subscribe(
      (asistente) => {
        if (asistente) {
          this.userData = asistente;
          console.log('Datos del asistente:', this.userData); // Verifica los datos obtenidos
        } else {
          console.log('No se encontró un asistente con el email:', email);
        }
      },
      (error) => {
        console.error('Error al obtener los datos del asistente:', error);
      }
    );
  }

  irAInicio() {
    this.router.navigate(['/inicio']);
  }

  toggleNotificationsMenu() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
  }

  irACurso(opcion: string) {
    this.opcionSeleccionada = opcion;
    this.router.navigate(['/cursos'], { queryParams: { opcion: opcion } });
    console.log(opcion);
  }

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

  logOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/auth/log-in');
  }
}
