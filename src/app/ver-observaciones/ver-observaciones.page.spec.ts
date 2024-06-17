import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerObservacionesPage } from './ver-observaciones.page';

describe('VerObservacionesPage', () => {
  let component: VerObservacionesPage;
  let fixture: ComponentFixture<VerObservacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerObservacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
