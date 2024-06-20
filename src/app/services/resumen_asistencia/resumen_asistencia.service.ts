import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ModelResumen } from 'src/app/modelos/resuemen_asisModel';


@Injectable({
  providedIn: 'root'
})
export class ResuemnAsistenciaService {
  constructor(private _http: HttpClient) {}

  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set( "apiKey",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU'
  )
  agregarAsistencia(registrarA: ModelResumen): Observable<string | any> {
    return this._http.post<any>(this.superbaseUrl + 'RESUMEN_ASIS', registrarA, { headers: this.supabaseHeaders });
  }

  obtenerTodaAsistencia(): Observable<ModelResumen[]> {
    return this._http.get<ModelResumen[]>(this.superbaseUrl + 'RESUMEN_ASIS', { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al obtener asistencia:', error);
          return of([]); // Devolver un array vacío en caso de error
        })
      );
  }

  obtenerAsistenciaPorAlumno(idAlumno: string): Observable<ModelResumen[]> {
    return this._http.get<ModelResumen[]>(`${this.superbaseUrl}RESUMEN_ASIS?select=*&id_alumno=eq.${idAlumno}`, { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al obtener asistencia:', error);
          return of([]); // Devolver un array vacío en caso de error
        })
      );
  }
}