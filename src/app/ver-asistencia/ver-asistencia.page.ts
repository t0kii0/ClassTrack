import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {
  alumno: any;
  totalDias: number;
  diasAsistidos: number;
  porcentajeAsistencia: number;

  constructor(private navController: NavController,
    private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    
    const state = navigation?.extras.state as {
      alumno: any,
      totalDias: number,
      diasAsistidos: number,
      porcentajeAsistencia: number
    };

    this.alumno = state.alumno;
    this.totalDias = state.totalDias;
    this.diasAsistidos = state.diasAsistidos;
    this.porcentajeAsistencia = state.porcentajeAsistencia;
  }

  ngOnInit() {}

  irAInicio() {
    this.navController.navigateForward('/inicio');
  }
}
