import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObservacionService } from '../services/Observacion/observacion.service';

@Component({
  selector: 'app-ver-observaciones',
  templateUrl: './ver-observaciones.page.html',
  styleUrls: ['./ver-observaciones.page.scss'],
})
export class VerObservacionesPage implements OnInit {
  rut: string | null = null;
  observaciones: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private observacionService: ObservacionService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.rut = params.get('rut');
      if (this.rut) {
        this.cargarObservaciones(this.rut);
      } else {
        console.error('RUT no encontrado en la URL');
      }
    });
  }

  cargarObservaciones(rut: string) {
    this.observacionService.obtenerObservacionesPorRut(rut).subscribe(observaciones => {
      this.observaciones = observaciones;
      console.log('Observaciones para el RUT:', rut, observaciones);
    });
  }
}
