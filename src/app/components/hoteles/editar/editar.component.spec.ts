import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarHotelComponent } from './editar.component';

describe('EditarComponent', () => {
  let component: EditarHotelComponent;
  let fixture: ComponentFixture<EditarHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
