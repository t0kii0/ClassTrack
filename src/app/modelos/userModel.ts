import { ModelCurso } from "./cursoModel";

export interface ModelAlumno{

    rut: string;
    nombre: string;
    apellido: string;
    fecha_nacimiento: Date;
    apmaterno: string;
    tipo_user: string;
    idCurso?: Number;
}