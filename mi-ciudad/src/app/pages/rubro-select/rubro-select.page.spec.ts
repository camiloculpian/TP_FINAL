import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RubroSelectPage } from './rubro-select.page';

describe('RubroSelectPage', () => {
  let component: RubroSelectPage;
  let fixture: ComponentFixture<RubroSelectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RubroSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
