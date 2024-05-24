import { ModelAsignatura } from './asignaturaModel';
import { ModelAlumno } from './userModel';

export interface ModelNota{
    id_asignatura: number;
    id_alumno: string;
    nota: number;
    asignagtura?: ModelAsignatura;
    alumno?: ModelAlumno;
}