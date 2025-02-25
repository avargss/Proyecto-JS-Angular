import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmpleadoComponent } from './editar.component';

describe('EditarComponent', () => {
  let component: EditarEmpleadoComponent;
  let fixture: ComponentFixture<EditarEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
