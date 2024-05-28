import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from '../services/asignatura/asignatura.service';
import { FormGroup,FormBuilder,Validators,ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ModelCurso } from '../modelos/cursoModel';
import { CursoService } from '../services/curso/curso.service';

@Component({
  selector: 'app-crear-asignatura',
  templateUrl: './crear-asignatura.page.html',
  styleUrls: ['./crear-asignatura.page.scss'],
  providers: [AsignaturaService]
})
export class CrearAsignaturaPage implements OnInit {

  FormularioAsignatura : FormGroup;
  cursos: ModelCurso[] = [];

  constructor(private asignaturaService : AsignaturaService, 
              private fb : FormBuilder,
              private alertController: AlertController,
              private cursoService: CursoService) {

    this.FormularioAsignatura = this.fb.group({
      id: ['', Validators.required],
      nombre_asignatura: ['', Validators.required],
      curso: ['', Validators.required],
   });

   }

   ngOnInit() {
    this.loadCursos();
  }
  async agregarAsignatura() {
    if (!this.FormularioAsignatura){
      console.error('Error this.formulario no definido...')
        return;
        }
        const formDataAlumno = this.FormularioAsignatura.value;
    this.asignaturaService.addAsignatura(formDataAlumno).subscribe(
      (result = this.agregarAsignatura) => {
        console.log('Se guardo con exito:', result);
        this.presentAlert('Éxito', 'La asignatura se creo satisfactoriamente.');
    },
    (error) => {
      console.error('Error al guardar el alumno: ',error);
      this.presentAlert('Error', 'Asignatura ya inscrita.');
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
}
