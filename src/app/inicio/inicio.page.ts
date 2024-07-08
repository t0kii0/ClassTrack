import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular'; // Importa ModalController
import { AuthService } from '../auth/data-access/auth.service';
import { AsistenteService } from '../services/asistente/asistente.service';
import { NotificacionService } from '../services/notificaciones/notificacion.service';
import { ModelAsistente } from '../modelos/asistenteModel';
import { ModelNotificacion } from '../modelos/notificacionModel';
import { ObservacionModalComponent } from '../observacion-modal/observacion-modal.component'; // Importa el componente del modal

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  showNotificationsMenu = false;
  notifications: ModelNotificacion[] = [];
  opcionSeleccionada: string = '';
  userEmail: string = '';
  userData: ModelAsistente | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private asistenteService: AsistenteService,
    private notificacionService: NotificacionService,
    private modalController: ModalController // Inyecta ModalController
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo() {
    try {
      const session = await this.authService.session();
      if (session?.data?.session?.user?.email) {
        this.userEmail = session.data.session.user.email;
        this.getUserData(this.userEmail);
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
          console.log('Datos del asistente:', this.userData);
          this.getNotificationsByUserRole(this.userData.rol);
        } else {
          console.log('No se encontró un asistente con el email:', email);
        }
      },
      (error) => {
        console.error('Error al obtener los datos del asistente:', error);
      }
    );
  }

  getNotificationsByUserRole(role: string) {
    this.notificacionService.getNotificationsByRole(role).subscribe(
      (notificaciones) => {
        this.notifications = notificaciones;
      },
      (error) => {
        console.error('Error al obtener las notificaciones:', error);
      }
    );
  }

  toggleNotificationsMenu() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
  }

  async openObservacionModal() {
    if (this.userData) {
      const modal = await this.modalController.create({
        component: ObservacionModalComponent,
        componentProps: {
          autor: this.userData // Pasa el usuario como autor
        }
      });
      return await modal.present();
    } else {
      console.error('No se pudo obtener la información del autor.');
    }
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
