import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ModelAgenda } from '../../modelos/agendaModel';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  apiUrl: any;
  constructor(private _http: HttpClient) {}

  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set("apiKey", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU');

  addAgenda(agenda: ModelAgenda): Observable<any> {
    const headers = this.supabaseHeaders.set('Content-Type', 'application/json');
    return this._http.post<any>(`${this.superbaseUrl}AGENDA`, agenda, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al agregar la agenda:', error.message);
          console.error('Detalles del error:', error);
          return throwError(error); // Propagar el error para manejarlo en el componente
        })
      );
  }

  getHorariosAgendados(fecha: Date): Observable<ModelAgenda[]> {
    const fechaStr = fecha.toISOString().split('T')[0];
    const url = `${this.superbaseUrl}AGENDA?fecha=eq.${fechaStr}`;
    return this._http.get<ModelAgenda[]>(url, { headers: this.supabaseHeaders })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al obtener los horarios agendados:', error.message);
          console.error('Detalles del error:', error);
          return throwError(error);
        })
      );
  }

  isHoraAgendada(fecha: Date, hora: string): Observable<boolean> {
    const fechaStr = fecha.toISOString().split('T')[0];
    const url = `${this.superbaseUrl}AGENDA?fecha=eq.${fechaStr}&hora=eq.${hora}`;
    return this._http.get<ModelAgenda[]>(url, { headers: this.supabaseHeaders })
      .pipe(
        map(agendas => agendas.length > 0),
        catchError((error: HttpErrorResponse) => {
          console.error('Error al verificar si la hora está agendada:', error.message);
          console.error('Detalles del error:', error);
          return throwError(error);
        })
      );
  }
}
