import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CursoService } from '../services/curso/curso.service';
import { ModelCurso } from '../modelos/cursoModel';

@Component({
  selector: 'app-crear-user',
  templateUrl: './crear-user.page.html',
  styleUrls: ['./crear-user.page.scss'],
  providers: [UserService]
})
export class CrearUserPage implements OnInit {

  FormularioAlumno: FormGroup;
  cursos: ModelCurso[] = [];

  constructor(
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
      tipo_user: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCursos();
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
