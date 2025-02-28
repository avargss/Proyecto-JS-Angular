import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Hoteles } from '../../../model/hoteles';
import { HotelesService } from '../../../services/hoteles.service';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleHotelComponent implements OnInit, AfterViewInit, OnDestroy {
  hotelForm: FormGroup;
  hotel: Hoteles | null = null;
  private mapa!: L.Map;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private hotelesService: HotelesService) {
    this.hotelForm = this.fb.group({
      nombre: [{ value: '', disabled: true }],
      direccion: [{ value: '', disabled: true }],
      provincia: [{ value: '', disabled: true }],
      aforo: [{ value: '', disabled: true }],
      piscina: [{ value: false, disabled: true }]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadHotel(id);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const mapElement = document.getElementById('map');
      if (!mapElement) {
        console.error('No se encontró el contenedor del mapa.');
        return;
      }

      this.mapa = L.map(mapElement).setView([Number(this.hotel?.latitud), Number(this.hotel?.longitud)], 50);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.mapa);

      L.marker([Number(this.hotel?.latitud), Number(this.hotel?.longitud)]).addTo(this.mapa)
        .bindPopup(this.hotel?.nombre || '')
        .openPopup();

    }, 500);
  }

  ngOnDestroy(): void {
    if (this.mapa) {
      this.mapa.remove();
    }
  }

  loadHotel(id: string): void {
    this.hotelesService.getHotelById(id).subscribe(
      (hotel) => {
        this.hotel = hotel;
        this.hotelForm.patchValue(hotel);
        if (this.mapa) {
          this.mapa.setView([hotel.latitud, hotel.longitud], 13);
          L.marker([hotel.latitud, hotel.longitud]).addTo(this.mapa)
            .bindPopup(hotel.nombre)
            .openPopup();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}