import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ModelPromedio } from 'src/app/modelos/promedioModel';

@Injectable({
  providedIn: 'root'
})
export class PromedioService {
  constructor(private _http: HttpClient) {}

  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set( "apiKey",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU'
  )

  verificarPromedio(idAlumno: string, idAsignatura: number): Observable<boolean> {
    const url = `${this.superbaseUrl}PROMEDIO?select=*&id_alumno=eq.${idAlumno}&id_asignatura=eq.${idAsignatura}`;
    return this._http.get<ModelPromedio[]>(url, { headers: this.supabaseHeaders })
      .pipe(
        map(promedios => promedios.length > 0),
        catchError(error => {
          console.error('Error al verificar promedio:', error);
          return of(false);
        })
      );
  }

  agregarPromedio(idAlumno: string, idAsignatura: number, prom: number): Observable<any> {
    const nuevoPromedio: ModelPromedio = {
      id_alumno: idAlumno,
      id_asignatura: idAsignatura,
      prom: prom
    };
    const url = `${this.superbaseUrl}PROMEDIO`;
    return this._http.post<any>(url, nuevoPromedio, { headers: this.supabaseHeaders });
  }

  actualizarPromedio(idAlumno: string, idAsignatura: number, prom: number): Observable<any> {
    const url = `${this.superbaseUrl}PROMEDIO?id_alumno=eq.${idAlumno}&id_asignatura=eq.${idAsignatura}`;
    return this._http.patch<any>(url, { prom: prom }, { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al actualizar promedio:', error);
          return of(null);
        })
      );
  }
}
