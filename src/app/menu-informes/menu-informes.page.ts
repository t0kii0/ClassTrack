import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-informes',
  templateUrl: './menu-informes.page.html',
  styleUrls: ['./menu-informes.page.scss'],
})
export class MenuInformesPage implements OnInit {
  
  constructor(private router : Router) { }

  ngOnInit() {
  }

  reporte() {
    this.router.navigate(['/reporte']);
    console.log("entrooo");
  }
  observaciones() {
    this.router.navigate(['/informe-observacion']);
    console.log(onclick);
  }
  anotacion() {
    this.router.navigate(['/informe-anotacion']);
    console.log("entroo");
  }
  asistencia(){
    this.router.navigate(['/informe-asistencia']);
    console.log("entramoos");
  }
  grafico(){
    this.router.navigate(['/reporte-grafico'])
  }
}
