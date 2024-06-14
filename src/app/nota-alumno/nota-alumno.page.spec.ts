import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotaAlumnoPage } from './nota-alumno.page';

describe('NotaAlumnoPage', () => {
  let component: NotaAlumnoPage;
  let fixture: ComponentFixture<NotaAlumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
