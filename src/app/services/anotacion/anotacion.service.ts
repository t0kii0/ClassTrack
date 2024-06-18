import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ModelAnotacion } from 'src/app/modelos/anotacionModel';
@Injectable({
  providedIn: 'root'
})
export class AnotacionService {
  constructor(private _http: HttpClient) {}

  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set( "apiKey",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU'
  )
  // Método para agregar una nota asociada a un alumno y asignatura específicos
  agregarAnotacionAlumnoAsignatura(idAlumno: string, idAsignatura: number, tipoanotacion: boolean, fecha: Date, motivo: string): Observable<string | any> {
    const nuevaAnotacion: ModelAnotacion = {
        // El ID debe ser manejado por la base de datos (Supabase)
        id_alumno: idAlumno,
        id_asignatura: idAsignatura,
        tipo_anotacion: tipoanotacion,
        fecha: fecha,
        motivo: motivo,
        id: 0
    };
    return this._http.post<any>(this.superbaseUrl + 'ANOTACIONES',nuevaAnotacion, { headers: this.supabaseHeaders });
  }

  obtenerTodaAnotacion(): Observable<ModelAnotacion[]> {
    return this._http.get<ModelAnotacion[]>(this.superbaseUrl + 'ANOTACIONES', { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al obtener notas:', error);
          return of([]); // Devolver un array vacío en caso de error
        })
      );
  }
  obtenerAnotacionesPorRut(rut: string): Observable<ModelAnotacion[]> {
    return this._http.get<ModelAnotacion[]>(`${this.superbaseUrl}ANOTACIONES?id_alumno=eq.${rut}`, { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error(`Error al obtener anotaciones para el rut ${rut}:`, error);
          return of([]); // Devolver un array vacío en caso de error
        })
      );
  }
}
