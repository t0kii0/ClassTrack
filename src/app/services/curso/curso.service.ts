import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ModelCurso } from 'src/app/modelos/cursoModel';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  constructor(private _http: HttpClient) {}

  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set( "apiKey",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU'
)
  addCurso(registrarA: ModelCurso): Observable<string | any> {
    return this._http.post<any>(this.superbaseUrl + 'CURSO', registrarA,{headers: this.supabaseHeaders});
}
obtenerTodoCurso(): Observable<ModelCurso[]> {
  return this._http.get<ModelCurso[]>(this.superbaseUrl + 'CURSO', { headers: this.supabaseHeaders })
    .pipe(
      catchError(error => {
        console.error('Error al obtener Curso:', error);
        return of([]); // Devolver un array vacío en caso de error
      })
    );
}

}