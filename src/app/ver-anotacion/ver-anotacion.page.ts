import { Component, OnInit } from '@angular/core';
import { AnotacionService } from '../services/anotacion/anotacion.service';
import { ActivatedRoute } from '@angular/router';
import { ModelAnotacion } from '../modelos/anotacionModel';

@Component({
  selector: 'app-ver-anotacion',
  templateUrl: './ver-anotacion.page.html',
  styleUrls: ['./ver-anotacion.page.scss'],
})
export class VerAnotacionPage implements OnInit {

  rut: string | null = null;
  motivo: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private anotacionService: AnotacionService
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
    this.anotacionService.obtenerAnotacionesPorRut(rut).subscribe(motivo => {
      this.motivo = motivo;
      console.log('Observaciones para el RUT:', rut, motivo);
    });
  }
}
