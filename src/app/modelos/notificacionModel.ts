export interface ModelNotificacion {
    mensaje: string;
    rol: string; // Rol del destinatario (e.g., 'psicopedagogo', 'admin')
    email: string; // Correo del destinatario
    fecha: Date;
  }
  