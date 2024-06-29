import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerGraficoPage } from './ver-grafico.page';

describe('VerGraficoPage', () => {
  let component: VerGraficoPage;
  let fixture: ComponentFixture<VerGraficoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerGraficoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
