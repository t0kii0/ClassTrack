import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage  implements OnInit {

  constructor( private router : Router) { }

  ngOnInit() {}

  librodeclases(){
    console.log('entraste con exitoooooooooooooooo');
    this.router.navigate(['/lbclases']);
  }
  anotaciones() {
    console.log('Anotaste a un wn');
    this.router.navigate(['/anotacion']);
}
  asistencia() {
    console.log('El loco vino');
    this.router.navigate(['/asistencia']);
}
 observacion(){
  console.log('observastee o.0?');
  this.router.navigate(['/observacion']);
 }
 reporte(){
  console.log('Reportaste');
  this.router.navigate(['/reporte']);
 }
}
