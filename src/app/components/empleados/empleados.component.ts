import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Empleados } from '../../model/empleados';
import { EmpleadosService } from '../../services/empleados.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empleados',
  imports: [CommonModule, RouterLink],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})

export class EmpleadosComponent {

  @Input() empleadosList: Empleados[] = [];

  empleadosService: EmpleadosService = inject(EmpleadosService);

  constructor() {

    this.empleadosService.getAllEmpleados().subscribe(
      (empleadosList) => {
        this.empleadosList = empleadosList;
      },
      (error) => {
        console.error('Error al obtener los empleados', error);
      }
    );
  }

  
  deleteEmpleado(id: number) {
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
