import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearAsistentePage } from './crear-asistente.page';

describe('CrearAsistentePage', () => {
  let component: CrearAsistentePage;
  let fixture: ComponentFixture<CrearAsistentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAsistentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
