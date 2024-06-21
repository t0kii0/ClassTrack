import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ModelAgenda } from '../../modelos/agendaModel';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  apiUrl: any;
  constructor(private _http: HttpClient) {}
  
  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set( "apiKey",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU')


  addAgenda(agenda: ModelAgenda): Observable<any> {
    return this._http.post<any>(`${this.superbaseUrl}AGENDA`, agenda, { headers: this.supabaseHeaders })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al agregar la agenda:', error.message);
          console.error('Detalles del error:', error);
          return of(null);
        })
      );
  }
}
