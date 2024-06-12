export interface ModelAsistencia {
    id?: number;
    id_alumno: string;
    id_asignatura: number;
    id_curso: number;
    fecha_asis: Date;
    asistio: boolean;
    justificacion?: string;
  }
  