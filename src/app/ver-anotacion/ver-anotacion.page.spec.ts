import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerAnotacionPage } from './ver-anotacion.page';

describe('VerAnotacionPage', () => {
  let component: VerAnotacionPage;
  let fixture: ComponentFixture<VerAnotacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAnotacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
