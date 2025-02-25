import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hoteles } from '../../../model/hoteles';
import { HotelesService } from '../../../services/hoteles.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})

export class CrearHotelComponent implements OnInit {

  hoteles: Hoteles[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private hotelesService: HotelesService, private router: Router) {
    this.form = this.fb.group({
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
    this.hotelesService.getAllHoteles().subscribe(
      (hoteles) => {
        this.hoteles = hoteles;
      },
      (error) => {
        console.log('Error al obtener hoteles', error);
      }
    );
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nuevoHotel: Hoteles = {
      id: (Number(this.hoteles[this.hoteles.length - 1].id) + 1).toString(),
      nombre: this.form.value.nombre,
      direccion: this.form.value.direccion,
      provincia: this.form.value.provincia,
      aforo: this.form.value.aforo,
      piscina: this.form.value.piscina,
      latitud: this.form.value.latitud,
      longitud: this.form.value.longitud
    };

    this.hotelesService.addHotel(nuevoHotel).subscribe(
      (response) => {
        console.log('Hotel creado:', response);
        this.form.reset();
        this.router.navigate(['/hoteles']);
      },
      (error) => {
        console.error('Error al crear hotel', error);
      }
    );
  }

}