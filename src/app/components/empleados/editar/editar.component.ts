import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empleados } from '../../../model/empleados';
import { EmpleadosService } from '../../../services/empleados.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  empleadoForm: FormGroup;
  empleado: Empleados | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private empleadosService: EmpleadosService, private router: Router) {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      edad: ['', Validators.required],
      fecha_nacimiento: ['', [Validators.required]],
      id_hotel: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEmpleado(Number(id));
    }
  }

  loadEmpleado(id: number): void {
    this.empleadosService.getEmpleadoById(id).subscribe(
      (empleado) => {
        this.empleado = empleado;
        this.empleadoForm.patchValue(empleado);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.empleadoForm.invalid) {
      this.empleadoForm.markAllAsTouched();
      return;
    }

    if (this.empleadoForm.valid) {
      const updatedEmpleado = { ...this.empleado, ...this.empleadoForm.value };
      this.empleadosService.updateEmpleado(updatedEmpleado).subscribe(
        (response) => {
          console.log('Empleado actualizado: ', response);
          this.router.navigate(['/empleados']);
        },
        (error) => {
          console.error('Error al actualizar el empleado: ', error);
        }
      );
    }
  }

}