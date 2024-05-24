import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ModelAsignatura } from 'src/app/modelos/asignaturaModel';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  constructor(private _http: HttpClient) {}

  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set( "apiKey",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU'
)
  addAsignatura(registrarA: ModelAsignatura): Observable<string | any> {
    return this._http.post<any>(this.superbaseUrl + 'ASIGNATURA', registrarA,{headers: this.supabaseHeaders});
}
obtenerTodoAsignatura(): Observable<ModelAsignatura[]> {
  return this._http.get<ModelAsignatura[]>(this.superbaseUrl + 'ASIGNATURA', { headers: this.supabaseHeaders })
    .pipe(
      catchError(error => {
        console.error('Error al obtener Asignatura:', error);
        return of([]); // Devolver un array vacío en caso de error
      })
    );
}
}