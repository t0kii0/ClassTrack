import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformeAnotacionPage } from './informe-anotacion.page';

describe('InformeAnotacionPage', () => {
  let component: InformeAnotacionPage;
  let fixture: ComponentFixture<InformeAnotacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeAnotacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
