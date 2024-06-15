import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ModelDocente } from '../../modelos/docenteModel'; // Cambia a ModelDocente
import { ModelCurso } from 'src/app/modelos/cursoModel';
import { map, filter } from 'rxjs/operators';
import { ModelAsistente } from 'src/app/modelos/asistenteModel';

@Injectable({
  providedIn: 'root'
})
export class AsistenteService {
  apiUrl: any;
  constructor(private _http: HttpClient) {}

  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set( "apiKey", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU');

  addAsistente(registrarD: ModelAsistente): Observable<string | any> {
    return this._http.post<any>(this.superbaseUrl + 'ASISTENTE', registrarD, {headers: this.supabaseHeaders});
  }

  obtenerTodoAsistente(curso?: number): Observable<ModelAsistente[]> {
    let url = this.superbaseUrl + 'ASISTENTE';
    if (curso !== undefined) {
      url += `?curso=eq.${curso}`;
    }
    return this._http.get<ModelAsistente[]>(url, { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al obtener asistentes:', error);
          return of([]); // Retorna un arreglo vacío en caso de error
        })
      );
  }

  buscarAsistentes(criteria: any): Observable<ModelAsistente[]> {
    return this._http.post<ModelAsistente[]>(`${this.apiUrl}/buscarAsistente`, criteria);
  }

  obtenerAsistentesConCurso(): Observable<(ModelAsistente & { curso?: ModelCurso })[]> {
    return this._http.get<(ModelAsistente & { curso?: ModelCurso })[]>(this.superbaseUrl + 'ASISTENTE?select=*,curso:CURSO(*)', { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al obtener asistentes con curso:', error);
          return of([]); // Retorna un arreglo vacío en caso de error
        })
      );
  }

  obtenerAsistentePorRut(rut: string): Observable<ModelAsistente> {
    return this._http.get<ModelAsistente[]>(`${this.superbaseUrl}ASISTENTE?rut=eq.${rut}`, { headers: this.supabaseHeaders })
      .pipe(
        map(asistentes => asistentes.length > 0 ? asistentes[0] : null),
        catchError(error => {
          console.error('Error al obtener docente por RUT:', error);
          return of(null);
        }),
        filter((asistente): asistente is ModelDocente => asistente !== null)
      );
  }
}
