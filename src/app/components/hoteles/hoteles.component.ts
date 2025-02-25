import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Hoteles } from '../../model/hoteles';
import { HotelesService } from '../../services/hoteles.service';
import { EmpleadosService } from '../../services/empleados.service';
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
  empleadoService: EmpleadosService = inject(EmpleadosService);

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

    this.empleadoService.getEmpleadoByHotelId(id).subscribe(
      (empleados) => {
        if (empleados.length > 0) {
          alert('No se puede eliminar el hotel porque tiene empleados asociados');
        } else {
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
      },
      (error) => {
        console.error('Error al verificar empleados asociados', error);
      });
  }
}
