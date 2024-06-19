  import { Component, OnInit } from '@angular/core';
  import { UserService } from '../services/users/users.service';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { AlertController } from '@ionic/angular';
  import { CursoService } from '../services/curso/curso.service';
  import { ModelCurso } from '../modelos/cursoModel';
  import { Router } from '@angular/router';
  import * as Papa from 'papaparse';

  interface CSVRow {
    'Run': string;
    'Nombres': string;
    'Apellido Paterno': string;
    'Apellido Materno': string;
    'Fecha Nacimiento': string;
    'Cod Grado': number

  }

  @Component({
    selector: 'app-crear-user',
    templateUrl: './crear-user.page.html',
    styleUrls: ['./crear-user.page.scss'],
    providers: [UserService]
  })
  export class CrearUserPage implements OnInit {
    showNotificationsMenu = false;
  notifications = ['Notificación 1', 'Notificación 2', 'Notificación 3']; // Ejemplo de notificaciones

    FormularioAlumno: FormGroup;
    cursos: ModelCurso[] = [];

    constructor(private router: Router,
      private userService: UserService,
      private fb: FormBuilder, 
      private alertController: AlertController,
      private cursoService: CursoService
    ) {
      this.FormularioAlumno = this.fb.group({
        rut: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        apmaterno: ['', Validators.required],
        fecha_nacimiento: ['', Validators.required],
        curso: ['', Validators.required],
        tipo_user: ['ALUMNO', Validators.required] // Set default value to 'ALUMNO'
      });
    }

    ngOnInit() {
      this.loadCursos();
    }
    toggleNotificationsMenu() {
      this.showNotificationsMenu = !this.showNotificationsMenu;
    }

    async agregarUsuario() {
      if (!this.FormularioAlumno.valid) {
        console.error('Formulario no válido...');
        return;
      }
      const formDataAlumno = this.FormularioAlumno.value; 
      this.userService.addUser(formDataAlumno).subscribe(
        (result) => {
          console.log('Se guardó con éxito:', result);
          this.presentAlert('Éxito', 'El usuario se ha guardado correctamente.');
        },
        (error) => {
          console.error('Error al guardar el alumno: ', error);
          this.presentAlert('Error', 'El usuario ya existe.');
        }
      );
    }
    irAInicio() {
      this.router.navigate(['/inicio']);
    }
  

    async presentAlert(title: string, message: string) {
      const alert = await this.alertController.create({
        header: title,
        message: message,
        buttons: ['OK']
      });
      await alert.present();
    }

    loadCursos() {
      this.cursoService.obtenerTodoCurso().subscribe(
        (data: ModelCurso[]) => {
          this.cursos = data;
        },
        (error) => {
          console.error('Error al cargar cursos: ', error);
        }
      );
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
      for (const userData of data) {
        const formattedData = {
          id: null, // Asigna null o un valor temporal si es necesario
          rut: userData['Run'],
          nombre: userData['Nombres'],
          apellido: userData['Apellido Paterno'],
          apmaterno: userData['Apellido Materno'],
          fecha_nacimiento: new Date(userData['Fecha Nacimiento']),
          curso: userData['Cod Grado'],
          tipo_user: 'ALUMNO' // Asignar directamente el valor 'ALUMNO'
        };

        console.log('Datos formateados:', formattedData); // Imprimir los datos formateados

        this.userService.addUser(formattedData).subscribe(
          (result) => {
            console.log('Usuario guardado con éxito:', result);
          },
          (error) => {
            console.error('Error al guardar el usuario:', error);
            if (error.status === 409) {
              this.presentAlert('Error', `El usuario con RUT ${formattedData.rut} ya existe en la base de datos.`);
            } else {
              console.error('Detalles del error:', error.error);
              this.presentAlert('Error', 'Se produjo un error al guardar el usuario.');
            }
          }
        );
      }
      this.presentAlert('Éxito', 'Todos los usuarios se han guardado correctamente.');
    }
  }