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
    console.log();
  }
}
