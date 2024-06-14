import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformeNotaPage } from './informe-nota.page';

describe('InformeNotaPage', () => {
  let component: InformeNotaPage;
  let fixture: ComponentFixture<InformeNotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeNotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
