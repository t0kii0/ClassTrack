import { ModelCurso } from "./cursoModel";

export interface ModelAsignatura {
    id: number;
    nombre_asignatura: string;
    curso: number; 
    prom_curso: number;
}
  