import { Component, OnInit } from '@angular/core';
import { AsistenteService } from '../services/asistente/asistente.service'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CursoService } from '../services/curso/curso.service';
import { RolService } from '../services/rol/rol.service';
import { Router } from '@angular/router';
import * as Papa from 'papaparse';
import { ModelRol } from '../modelos/rolModel';

interface CSVRow {
  'Run': string;
  'Nombres': string;
  'Apellido Paterno': string;
  'Apellido Materno': string;
  'Fecha Nacimiento': string;
  'rol': string;
}

@Component({
  selector: 'app-crear-asistente',
  templateUrl: './crear-asistente.page.html',
  styleUrls: ['./crear-asistente.page.scss'],
  providers: [AsistenteService]
})
export class CrearAsistentePage implements OnInit {

  FormularioAsistente: FormGroup;
  showNotificationsMenu = false;
  notifications = ['Notificación 1', 'Notificación 2', 'Notificación 3'];
  rol: ModelRol [] = [];

  constructor(private router: Router,
    private asistenteService: AsistenteService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private rolService: RolService,
  ) {
    this.FormularioAsistente = this.fb.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      apmaterno: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      rol: ['', Validators.required] 
    });
  }

  ngOnInit() {
    this.loadRol();
  }

  toggleNotificationsMenu() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
  }

  irAInicio() {
    this.router.navigate(['/inicio']);
  }

  loadRol() {
    this.rolService.obtenerTodoRol().subscribe(
      (data: ModelRol[]) => {
        this.rol = data;
        console.log(this.rol);
      },
      (error) => {
        console.error('Error al cargar roles: ', error);
      }
    );
  }

  async agregarAsistente() {
    if (!this.FormularioAsistente.valid) {
      console.error('Formulario no válido...');
      return;
    }
    const formDataAsistente = this.FormularioAsistente.value;
    this.asistenteService.addAsistente(formDataAsistente).subscribe(
      (result) => {
        console.log('Se guardó con éxito:', result);
        this.presentAlert('Éxito', 'El asistente se ha guardado correctamente.');
      },
      (error) => {
        console.error('Error al guardar el asistente: ', error);
        this.presentAlert('Error', 'El asistente ya existe.');
      }
    );
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    Papa.parse<CSVRow>(file, {
      header: true,
      complete: (result: Papa.ParseResult<CSVRow>) => {
        this.saveCsvData(result.data);
      },
      error: (error: any) => {
        console.error('Error al leer el archivo CSV:', error);
      }
    });
  }

  saveCsvData(data: CSVRow[]) {
    for (const asistenteData of data) {
      const formattedData = {
        rut: asistenteData['Run'],
        nombre: asistenteData['Nombres'],
        apellido: asistenteData['Apellido Paterno'],
        apmaterno: asistenteData['Apellido Materno'],
        fecha_nacimiento: new Date(asistenteData['Fecha Nacimiento']),
        rol: asistenteData['rol']
      };

      console.log('Datos formateados:', formattedData);

      this.asistenteService.addAsistente(formattedData).subscribe(
        (result) => {
          console.log('Asistente guardado con éxito:', result);
        },
        (error) => {
          console.error('Error al guardar el asistente:', error);
          if (error.status === 409) {
            this.presentAlert('Error', `El asistente con RUT ${formattedData.rut} ya existe en la base de datos.`);
          } else {
            console.error('Detalles del error:', error.error);
            this.presentAlert('Error', 'Se produjo un error al guardar el asistente.');
          }
        }
      );
    }
    this.presentAlert('Éxito', 'Todos los asistentes se han guardado correctamente.');
  }
}
