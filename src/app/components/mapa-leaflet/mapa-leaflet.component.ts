import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-leaflet',
  templateUrl: './mapa-leaflet.component.html',
  styleUrls: ['./mapa-leaflet.component.css']
})

export class MapaLeafletComponent implements AfterViewInit, OnDestroy {
  private mapa!: L.Map;

  ngAfterViewInit(): void {
    setTimeout(() => {
      const mapElement = document.getElementById('map');
      if (!mapElement) {
        console.error('No se encontró el contenedor del mapa.');
        return;
      }

      this.mapa = L.map(mapElement).setView([36.6955, -4.4571], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.mapa);

      L.marker([36.6955, -4.4571]).addTo(this.mapa)
        .bindPopup('📍 Ubicación seleccionada')
        .openPopup();
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.mapa) {
      this.mapa.remove();
    }
  }
}
