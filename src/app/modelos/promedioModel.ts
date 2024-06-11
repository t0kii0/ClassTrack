import { ModelAsignatura } from "./asignaturaModel";
import { ModelAlumno } from "./userModel";

export interface ModelPromedio{
    id_asignatura: number;
    id_alumno: string;
    prom: number;
    asignagtura?: ModelAsignatura;
    alumno?: ModelAlumno;

}