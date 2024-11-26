import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './commerces.page';

describe('HomePage', () => {
  let component: CommercesPage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(CommercesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
