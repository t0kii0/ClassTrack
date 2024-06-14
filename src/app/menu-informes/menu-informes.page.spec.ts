import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuInformesPage } from './menu-informes.page';

describe('MenuInformesPage', () => {
  let component: MenuInformesPage;
  let fixture: ComponentFixture<MenuInformesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInformesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
