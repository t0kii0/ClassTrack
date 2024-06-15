import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../services/docente/docente.service'; // Cambia a DocenteService
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
  'Cod Grado': number;
}

@Component({
  selector: 'app-crear-docente',
  templateUrl: './crear-docente.page.html',
  styleUrls: ['./crear-docente.page.scss'],
  providers: [DocenteService]
})
export class CrearDocentePage implements OnInit {

  FormularioDocente: FormGroup;
  cursos: ModelCurso[] = [];

  constructor(
    private docenteService: DocenteService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private cursoService: CursoService
  ) {
    this.FormularioDocente = this.fb.group({
      rut: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      apmaterno: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      curso: ['', Validators.required],
      tipo_user: ['DOCENTE', Validators.required] // Set default value to 'DOCENTE'
    });
  }

  ngOnInit() {
    this.loadCursos();
  }

  async agregarDocente() {
    if (!this.FormularioDocente.valid) {
      console.error('Formulario no válido...');
      return;
    }
    const formDataDocente = this.FormularioDocente.value;
    this.docenteService.addDocente(formDataDocente).subscribe(
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
    for (const docenteData of data) {
      const formattedData = {
        rut: docenteData['Run'],
        nombre: docenteData['Nombres'],
        apellido: docenteData['Apellido Paterno'],
        apmaterno: docenteData['Apellido Materno'],
        fecha_nacimiento: new Date(docenteData['Fecha Nacimiento']),
        curso: docenteData['Cod Grado'],
        tipo_user: 'DOCENTE' // Asignar directamente el valor 'DOCENTE'
      };

      console.log('Datos formateados:', formattedData);

      this.docenteService.addDocente(formattedData).subscribe(
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

