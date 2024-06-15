export interface ModelDocente {
    rut: string;
    nombre: string;
    apellido: string;
    fecha_nacimiento: Date;
    apmaterno: string;
    tipo_user: string;
    idCurso?: number;
    curso: any;
    status?: string;
    observation?: string; 
  }
  