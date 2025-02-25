import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Hoteles } from '../../model/hoteles';
import { HotelesService } from '../../services/hoteles.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hoteles',
  imports: [CommonModule, RouterLink],
  templateUrl: './hoteles.component.html',
  styleUrl: './hoteles.component.css'
})
export class HotelesComponent {

  @Input() hotelesList: Hoteles[] = [];

  hotelesService: HotelesService = inject(HotelesService);

  constructor() {

    this.hotelesService.getAllHoteles().subscribe(
      (hotelesList) => {
        this.hotelesList = hotelesList;
      },
      (error) => {
        console.error('Error al obtener los hoteles', error);
      }
    );
  }

  deleteHotel(id: string) {
    this.hotelesService.deleteHotel(id).subscribe(
      
      (response) => {
        console.log('Hotel eliminado correctamente:', response);
        this.hotelesList = this.hotelesList.filter((hotel) => hotel.id !== id);
      },
      (error) => {
        console.error('Error al eliminar el hotel', error);
      }
    );
  }
}
