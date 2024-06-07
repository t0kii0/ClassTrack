import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  agregar(){
    console.log('entraste.......')
    this.router.navigate(['/crear-user']); //
  }
  confiAsignatura(){
    console.log('entraste.......')
    this.router.navigate(['/crear-asignatura']); //
  }

  irAInicio() {
    // Redirige a la página de inicio
    this.router.navigate(['/inicio']);
  }


}
