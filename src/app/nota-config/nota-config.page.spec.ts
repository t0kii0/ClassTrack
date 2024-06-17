import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotaConfigPage } from './nota-config.page';

describe('NotaConfigPage', () => {
  let component: NotaConfigPage;
  let fixture: ComponentFixture<NotaConfigPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
