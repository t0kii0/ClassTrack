import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReporteGraficoPage } from './reporte-grafico.page';

describe('ReporteGraficoPage', () => {
  let component: ReporteGraficoPage;
  let fixture: ComponentFixture<ReporteGraficoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteGraficoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
