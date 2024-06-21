import { Injectable } from '@angular/core';

declare let Email: any; // Declaración para usar SMTPJS

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  enviarCorreo(destinatario: string, asunto: string, cuerpo: string) {
    return Email.send({
      SecureToken: "c8a46955-ce3c-4ea8-a8c9-a3b33da22aee",
      To: "siegfried100.mc@gmail.com",
      From: "man.conchar@duocuc.cl",
      Subject: asunto,
      Body: cuerpo,
    });
  }
}
