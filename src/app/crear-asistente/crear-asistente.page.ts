import { Component, OnInit } from '@angular/core';
import { AsistenteService } from '../services/asistente/asistente.service'; // Cambia a DocenteService
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CursoService } from '../services/curso/curso.service';
import { ModelCurso } from '../modelos/cursoModel';
import * as Papa from 'papaparse';

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
  cursos: ModelCurso[] = [];

  constructor(
    private asistenteService: AsistenteService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private cursoService: CursoService
  ) {
    this.FormularioAsistente = this.fb.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      apmaterno: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      curso: ['', Validators.required],
      rol: ['', Validators.required] // Set default value to 'DOCENTE'
    });
  }

  ngOnInit() {
    this.loadCursos();
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
        this.presentAlert('Éxito', 'El docente se ha guardado correctamente.');
      },
      (error) => {
        console.error('Error al guardar el docente: ', error);
        this.presentAlert('Error', 'El docente ya existe.');
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
          console.log('Docente guardado con éxito:', result);
        },
        (error) => {
          console.error('Error al guardar el docente:', error);
          if (error.status === 409) {
            this.presentAlert('Error', `El docente con RUT ${formattedData.rut} ya existe en la base de datos.`);
          } else {
            console.error('Detalles del error:', error.error);
            this.presentAlert('Error', 'Se produjo un error al guardar el docente.');
          }
        }
      );
    }
    this.presentAlert('Éxito', 'Todos los docentes se han guardado correctamente.');
  }
}
