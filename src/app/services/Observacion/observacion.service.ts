import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ModelObservacion } from 'src/app/modelos/observacionModel';

@Injectable({
  providedIn: 'root'
})
export class ObservacionService {
  constructor(private _http: HttpClient) {}

  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set("apiKey", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU'
  );

  agregarObservacionAlumno(idAlumno: string, fecha: Date, observacion: string, autor: string): Observable<string | any> {
    const nuevaObservacion: ModelObservacion = {
      id_alumno: idAlumno,
      fecha: fecha,
      observacion: observacion,
      autor: autor
    };
    return this._http.post<any>(this.superbaseUrl + 'OBSERVACION', nuevaObservacion, { headers: this.supabaseHeaders });
  }

  obtenerTodaObservacion(): Observable<ModelObservacion[]> {
    return this._http.get<ModelObservacion[]>(this.superbaseUrl + 'OBSERVACION', { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al obtener notas:', error);
          return of([]); // Devolver un array vacío en caso de error
        })
      );
  }
  obtenerObservacionesPorRut(rut: string): Observable<ModelObservacion[]> {
    return this._http.get<ModelObservacion[]>(`${this.superbaseUrl}OBSERVACION?id_alumno=eq.${rut}`, { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error(`Error al obtener observaciones para el rut ${rut}:`, error);
          return of([]); // Devolver un array vacío en caso de error
        })
      );
  }
}
