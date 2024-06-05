import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ModelAlumno } from '../../modelos/userModel';
import { ModelCurso } from 'src/app/modelos/cursoModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: any;
  constructor(private _http: HttpClient) {}

  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set( "apiKey",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU'
)
  addUser(registrarA: ModelAlumno): Observable<string | any> {
    return this._http.post<any>(this.superbaseUrl + 'ALUMNO', registrarA,{headers: this.supabaseHeaders});
}
obtenerTodoAlumno(curso?: number): Observable<ModelAlumno[]> {
  let url = this.superbaseUrl + 'ALUMNO';
  if (curso !== undefined) {
    url += `?curso=eq.${curso}`;
  }
  return this._http.get<ModelAlumno[]>(url, { headers: this.supabaseHeaders })
    .pipe(
      catchError(error => {
        console.error('Error al obtener alumnos:', error);
        return of([]); // Retorna un arreglo vacío en caso de error
      })
    );
}
buscarAlumnos(criteria: any): Observable<ModelAlumno[]> {
  return this._http.post<ModelAlumno[]>(`${this.apiUrl}/buscarAlumnos`, criteria);
}
obtenerAlumnosConCurso(): Observable<(ModelAlumno & { curso?: ModelCurso })[]> {
  return this._http.get<(ModelAlumno & { curso?: ModelCurso })[]>(this.superbaseUrl + 'ALUMNO?select=*,curso:CURSO(*)', { headers: this.supabaseHeaders })
    .pipe(
      catchError(error => {
        console.error('Error al obtener alumnos con curso:', error);
        return of([]); // Retorna un arreglo vacío en caso de error
      })
    );
}
}