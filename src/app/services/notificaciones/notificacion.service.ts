import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, pipe } from 'rxjs';
import { ModelNotificacion } from 'src/app/modelos/notificacionModel'


@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  constructor(private _http: HttpClient) {}

  superbaseUrl = 'https://alzycbtmqtcdkkddvxms.supabase.co/rest/v1/';
  supabaseHeaders = new HttpHeaders().set( "apiKey",'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsenljYnRtcXRjZGtrZGR2eG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2NjYzMTQsImV4cCI6MjAzMDI0MjMxNH0.fNqIvTPGHvKcN-SpZp51-grfIxt9DHBSTLbosxhdHFU'
  )
  sendNotification(notification: ModelNotificacion): Observable<any> {
    return this._http.post<any>(this.superbaseUrl + 'NOTIFICACION', notification,{headers: this.supabaseHeaders});
  }

  getNotifications(): Observable<ModelNotificacion[]> {
    return this._http.get<ModelNotificacion[]>(this.superbaseUrl + 'NOTIFICACION',{headers: this.supabaseHeaders});
  }

  getNotificationsByRole(role: string): Observable<ModelNotificacion[]> {
    return this._http.get<ModelNotificacion[]>(`${this.superbaseUrl}NOTIFICACION?select=*&rol=eq.${role}`,{ headers: this.supabaseHeaders })
    .pipe(
        catchError(error => {
          console.error('Error al obtener las notificaciones:', error);
          return of([]); // Devolver un array vacío en caso de error
        })
      );
}
sendEmail(email: string, subject: string, message: string): Observable<any> {
  const emailData = {
    to: email,
    subject: subject,
    message: message
  };
  return this._http.post(`${this.superbaseUrl}send-email`, emailData, { headers: this.supabaseHeaders })
    .pipe(
      catchError(error => {
        console.error('Error al enviar el correo:', error);
        return of({ success: false, message: 'Error al enviar el correo' });
      })
    );
}



}