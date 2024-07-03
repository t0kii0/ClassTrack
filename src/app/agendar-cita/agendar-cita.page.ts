import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { AgendaService } from '../services/agenda/agenda.service';
import { ModelAgenda } from '../modelos/agendaModel';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.page.html',
  styleUrls: ['./agendar-cita.page.scss']
})
export class AgendarCitaPage implements OnInit {
  FormularioFecha: FormGroup;
  horariosDisponibles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private navController: NavController,
    private alertController: AlertController,
    private agendaService: AgendaService
  ) {
    this.FormularioFecha = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit() {}

  irAInicio() {
    this.navController.navigateForward('/inicio');
  }

  async onFechaSubmit() {
    const fechaSeleccionada = new Date(this.FormularioFecha.value.fecha);

    // Validar que la fecha no sea en el pasado
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Establecer hora a 00:00:00 para comparar solo fechas
    if (fechaSeleccionada < hoy) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se puede agendar una cita en una fecha pasada.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    

    // Obtener los horarios agendados
    this.agendaService.getHorariosAgendados(fechaSeleccionada).subscribe(agendas => {
      const horariosAgendados = agendas.map(agenda => agenda.hora);
      this.horariosDisponibles = this.getHorariosDisponibles().filter(hora => !horariosAgendados.includes(hora));
    });
  }

  async agendarCita(horario: string) {
    const agenda: ModelAgenda = {
      fecha: new Date(this.FormularioFecha.value.fecha),
      hora: horario
    };

    // Verificar si el horario ya está agendado
    const horarioOcupado = await this.agendaService.isHoraAgendada(agenda.fecha, horario).toPromise();
    if (horarioOcupado) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: `La cita para las ${horario} ya está agendada.`,
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.agendaService.addAgenda(agenda).subscribe(
      async (result) => {
        console.log('Resultado de addAgenda:', result); // Debug line
        if (result && result.id) {  // Ajustar esta condición según la estructura de tu respuesta
          const alert = await this.alertController.create({
            header: '',
            message: '',
            buttons: ['OK']
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({           
            header: 'Exito',
            message: `Cita agendada para las ${horario}`,
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      async (error) => {
        console.error('Error en agendarCita:', error); // Debug line
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo agendar la cita. Intente nuevamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  private getHorariosDisponibles(): string[] {
    // Definir horarios disponibles en un día
    return ['09:00', '10:00', '11:00', '14:00', '15:00'];
  }
}
