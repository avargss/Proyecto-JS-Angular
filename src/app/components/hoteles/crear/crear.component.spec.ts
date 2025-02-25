import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHotelComponent } from './crear.component';

describe('CrearComponent', () => {
  let component: CrearHotelComponent;
  let fixture: ComponentFixture<CrearHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearHotelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
