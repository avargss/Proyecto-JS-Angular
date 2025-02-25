import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hoteles } from '../../../model/hoteles';
import { HotelesService } from '../../../services/hoteles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editarH',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarHotelComponent implements OnInit {
  hotelesForm: FormGroup;
  hotel: Hoteles | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private hotelesService: HotelesService, private router: Router) {
    this.hotelesForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      provincia: ['', Validators.required],
      aforo: ['', [Validators.required, Validators.min(1)]],
      piscina: [false, Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadHotel(id);
    }
  }

  loadHotel(id: string): void {
    this.hotelesService.getHotelById(id).subscribe(
      (hotel) => {
        this.hotel = hotel;
        this.hotelesForm.patchValue(hotel);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.hotelesForm.invalid) {
      this.hotelesForm.markAllAsTouched();
      return;
    }

    if (this.hotelesForm.valid) {
      const updatedHotel = { ...this.hotel, ...this.hotelesForm.value };
      this.hotelesService.updateHotel(updatedHotel).subscribe(
        (response) => {
          console.log('Hotel actualizado: ', response);
          this.router.navigate(['/hoteles']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}