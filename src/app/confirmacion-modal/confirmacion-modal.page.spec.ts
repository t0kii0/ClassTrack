import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacionModalPage } from './confirmacion-modal.page';

describe('ConfirmacionModalPage', () => {
  let component: ConfirmacionModalPage;
  let fixture: ComponentFixture<ConfirmacionModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
