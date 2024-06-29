import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ModelAsistencia } from 'src/app/modelos/asistenciaModel';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  constructor(private _http: HttpClient) {}

  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set( "apiKey",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU'
  )
  agregarAsistencia(registrarA: ModelAsistencia): Observable<string | any> {
    return this._http.post<any>(this.superbaseUrl + 'ASISTENCIA', registrarA, { headers: this.supabaseHeaders });
  }

  obtenerTodaAsistencia(): Observable<ModelAsistencia[]> {
    return this._http.get<ModelAsistencia[]>(this.superbaseUrl + 'ASISTENCIA', { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al obtener asistencia:', error);
          return of([]); // Devolver un array vacío en caso de error
        })
      );
  }

  obtenerAsistenciaPorAlumno(idAlumno: string): Observable<ModelAsistencia[]> {
    return this._http.get<ModelAsistencia[]>(`${this.superbaseUrl}ASISTENCIA?select=*&id_alumno=eq.${idAlumno}`, { headers: this.supabaseHeaders })
      .pipe(
        catchError(error => {
          console.error('Error al obtener asistencia:', error);
          return of([]); // Devolver un array vacío en caso de error
        })
      );
  }

  obtenerFechasUnicasPorCurso(idCurso: number): Observable<Date[]> {
    const url = `${this.superbaseUrl}ASISTENCIA?select=fecha_asis&id_curso=eq.${idCurso}`;
    return this._http.get<ModelAsistencia[]>(url, { headers: this.supabaseHeaders })
      .pipe(
        map(asistencias => {
          const fechasUnicas = new Set(asistencias.map(asistencia => new Date(asistencia.fecha_asis).toDateString()));
          return Array.from(fechasUnicas).map(fechaStr => new Date(fechaStr));
        }),
        catchError(error => {
          console.error('Error al obtener fechas únicas de asistencia:', error);
          return of([]);
        })
      );
  }

  obtenerDiasNoAsistidosPorAlumno(idAlumno: string): Observable<number> {
    const url = `${this.superbaseUrl}ASISTENCIA?select=*&id_alumno=eq.${idAlumno}&asistio=is.false`;
    return this._http.get<ModelAsistencia[]>(url, { headers: this.supabaseHeaders })
      .pipe(
        map(asistencias => {
          const fechasUnicasNoAsistidas = new Set(asistencias.map(asistencia => new Date(asistencia.fecha_asis).toDateString()));
          return fechasUnicasNoAsistidas.size;
        }),
        catchError(error => {
          console.error('Error al obtener días no asistidos:', error);
          return of(0);
        })
      );
  }
}