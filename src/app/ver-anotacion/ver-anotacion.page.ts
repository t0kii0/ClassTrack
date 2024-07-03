import { Component, OnInit } from '@angular/core';
import { AnotacionService } from '../services/anotacion/anotacion.service';
import { AsignaturaService } from '../services/asignatura/asignatura.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { ModelAnotacion } from '../modelos/anotacionModel';
import { ModelAsignatura } from '../modelos/asignaturaModel';

@Component({
  selector: 'app-ver-anotacion',
  templateUrl: './ver-anotacion.page.html',
  styleUrls: ['./ver-anotacion.page.scss'],
})
export class VerAnotacionPage implements OnInit {

  rut: string | null = null;
  motivo: (ModelAnotacion & { nombre_asignatura?: string })[] = [];
  asignaturas: ModelAsignatura[] = [];

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private anotacionService: AnotacionService,
    private asignaturaService: AsignaturaService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.rut = params.get('rut');
      if (this.rut) {
        this.cargarAsignaturasYAnotaciones(this.rut);
      } else {
        console.error('RUT no encontrado en la URL');
      }
    });
  }
  irAInicio() {
    this.navController.navigateForward('/inicio');
  }

  cargarAsignaturasYAnotaciones(rut: string) {
    this.asignaturaService.obtenerTodoAsignatura().subscribe(asignaturas => {
      this.asignaturas = asignaturas;
      this.anotacionService.obtenerAnotacionesPorRut(rut).subscribe(anotaciones => {
        this.motivo = anotaciones.map(anotacion => {
          const asignatura = this.asignaturas.find(a => a.id === anotacion.id_asignatura);
          return { 
            ...anotacion, 
            nombre_asignatura: asignatura ? asignatura.nombre_asignatura : 'Desconocida'
          };
        });
        console.log('Observaciones para el RUT:', rut, this.motivo);
      });
    });
  }
}
