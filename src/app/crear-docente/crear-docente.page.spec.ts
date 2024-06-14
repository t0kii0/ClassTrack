import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearDocentePage } from './crear-docente.page';

describe('CrearDocentePage', () => {
  let component: CrearDocentePage;
  let fixture: ComponentFixture<CrearDocentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
