import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Empleados } from '../../model/empleados';
import { EmpleadosService } from '../../services/empleados.service';
import { RouterLink } from '@angular/router';
import { Hoteles } from '../../model/hoteles';
import { HotelesService } from '../../services/hoteles.service';

@Component({
  selector: 'app-empleados',
  imports: [CommonModule, RouterLink],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export class EmpleadosComponent {

  @Input() empleadosList: Empleados[] = [];

  empleadosService: EmpleadosService = inject(EmpleadosService);
  hoteles: Hoteles[] = [];
  hotelesMap: { [key: string]: string } = {};

  constructor(private hotelesService: HotelesService) {

    this.empleadosService.getAllEmpleados().subscribe(
      (empleadosList) => {
        this.empleadosList = empleadosList;
      },
      (error) => {
        console.error('Error al obtener los empleados', error);
      }
    );

    this.hotelesService.getAllHoteles().subscribe(
      (hoteles) => {
        this.hoteles = hoteles;
        this.hotelesMap = this.hoteles.reduce((map, hotel) => {
          map[hotel.id] = hotel.nombre;
          return map;
        }, {} as { [key: string]: string });
      },
      (error) => {
        console.error('Error al obtener los hoteles', error);
      }
    );
  }
  
  deleteEmpleado(id: string) {
    this.empleadosService.deleteEmpleado(id).subscribe(
      
      (response) => {
        console.log('Empleado eliminado correctamente:', response);
        this.empleadosList = this.empleadosList.filter((empleado) => empleado.id !== id);
      },
      (error) => {
        console.error('Error al eliminar el empleado', error);
      }
    );
  }

}
