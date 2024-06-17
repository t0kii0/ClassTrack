import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerNotasPage } from './ver-notas.page';

describe('VerNotasPage', () => {
  let component: VerNotasPage;
  let fixture: ComponentFixture<VerNotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerNotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
