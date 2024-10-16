import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open camera', async () => {
    spyOn(component, 'openCamera');
    const button = fixture.debugElement.nativeElement.querySelector('ion-button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.openCamera).toHaveBeenCalled();
    });
  });
  
});
