import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformeAsistenciaPage } from './informe-asistencia.page';

describe('InformeAsistenciaPage', () => {
  let component: InformeAsistenciaPage;
  let fixture: ComponentFixture<InformeAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
