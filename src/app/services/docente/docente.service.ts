import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ModelDocente } from '../../modelos/docenteModel'; // Cambia a ModelDocente
import { ModelCurso } from 'src/app/modelos/cursoModel';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  apiUrl: any;
  constructor(private _http: HttpClient) {}

  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set( "apiKey", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU');

  addDocente(registrarD: ModelDocente): Observable<string | any> {
    return this._http.post<any>(this.superbaseUrl + 'DOCENTE', registrarD, {headers: this.supabaseHeaders});
  }

  obtenerTodoDocente(curso?: number): Observable<ModelDocente[]> {
    let url = this.superbaseUrl + 'DOCENTE';
    if (curso !== undefined) {
      url += `?curso=eq.${curso}`;
    }
    return this._http.get<ModelDocente[]>(url, { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al obtener docentes:', error);
          return of([]); // Retorna un arreglo vacío en caso de error
        })
      );
  }

  buscarDocentes(criteria: any): Observable<ModelDocente[]> {
    return this._http.post<ModelDocente[]>(`${this.apiUrl}/buscarDocentes`, criteria);
  }

  obtenerDocentesConCurso(): Observable<(ModelDocente & { curso?: ModelCurso })[]> {
    return this._http.get<(ModelDocente & { curso?: ModelCurso })[]>(this.superbaseUrl + 'DOCENTE?select=*,curso:CURSO(*)', { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al obtener docentes con curso:', error);
          return of([]); // Retorna un arreglo vacío en caso de error
        })
      );
  }

  obtenerDocentePorRut(rut: string): Observable<ModelDocente> {
    return this._http.get<ModelDocente[]>(`${this.superbaseUrl}DOCENTE?rut=eq.${rut}`, { headers: this.supabaseHeaders })
      .pipe(
        map(docentes => docentes.length > 0 ? docentes[0] : null),
        catchError(error => {
          console.error('Error al obtener docente por RUT:', error);
          return of(null);
        }),
        filter((docente): docente is ModelDocente => docente !== null)
      );
  }
}
