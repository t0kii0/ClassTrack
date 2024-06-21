import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
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
    private alertController: AlertController,
    private agendaService: AgendaService
  ) {
    this.FormularioFecha = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onFechaSubmit() {
    const fechaSeleccionada = this.FormularioFecha.value.fecha;
    // Simulación de horarios disponibles
    this.horariosDisponibles = this.getHorariosDisponibles(fechaSeleccionada);
  }

  async agendarCita(horario: string) {
    const agenda: ModelAgenda = {
      fecha: new Date(this.FormularioFecha.value.fecha),
      hora: horario
    };

    // Verificar si el horario ya está agendado
    if (this.isHoraAgendada(agenda.fecha, horario)) {
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
        if (result) {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: `Cita agendada para las ${horario}`,
            buttons: ['OK']
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'No se pudo agendar la cita1. Intente nuevamente.',
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo agendar la cita2 . Intente nuevamente.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  isHoraAgendada(fecha: Date, hora: string): boolean {
    const horaInicio = new Date(fecha);
    const horaFin = new Date(fecha);
    horaInicio.setHours(parseInt(hora.split(':')[0], 10));
    horaInicio.setMinutes(parseInt(hora.split(':')[1], 10));
    horaFin.setHours(horaInicio.getHours() + 1); // Suponemos que una cita dura 1 hora

    // Verificar si la hora está dentro de los horarios disponibles
    for (const horario of this.horariosDisponibles) {
      const horarioDisponible = new Date(fecha);
      horarioDisponible.setHours(parseInt(horario.split(':')[0], 10));
      horarioDisponible.setMinutes(parseInt(horario.split(':')[1], 10));

      if (horaInicio.getTime() === horarioDisponible.getTime()) {
        return false; // La hora está disponible
      }
    }

    return true; // La hora no está en los horarios disponibles
  }

  private getHorariosDisponibles(fecha: string): string[] { 
    // Simular la obtención de horarios disponibles para una fecha específica
    return ['09:00', '10:00', '11:00', '14:00', '15:00'];
  }
}
