import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformeObservacionPage } from './informe-observacion.page';

describe('InformeObservacionPage', () => {
  let component: InformeObservacionPage;
  let fixture: ComponentFixture<InformeObservacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeObservacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
