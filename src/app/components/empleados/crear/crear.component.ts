import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Empleados } from '../../../model/empleados';
import { EmpleadosService } from '../../../services/empleados.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})

export class CrearEmpleadoComponent implements OnInit {

  empleados: Empleados[] = [];
  form: FormGroup;

  constructor(private fb: FormBuilder, private empleadosService: EmpleadosService, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18)]],
      fecha_nacimiento: ['', [Validators.required, this.fechaNacimientoValidator.bind(this)]],
      id_hotel: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.empleadosService.getAllEmpleados().subscribe(
      (empleados) => {
        this.empleados = empleados;
      },
      (error) => {
        console.log('Error al obtener empleados', error);
      }
    );
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nuevoEmpleado: Empleados = {
      id: this.generarIdAleatoria(),
      nombre: this.form.value.nombre,
      apellidos: this.form.value.apellidos,
      edad: this.form.value.edad,
      fecha_nacimiento: this.form.value.fecha_nacimiento,
      id_hotel: this.form.value.id_hotel
    };

    this.empleadosService.addEmpleado(nuevoEmpleado).subscribe(
      (response) => {
        console.log('Empleado creado:', response);
        this.form.reset();
        this.router.navigate(['/empleados']);
      },
      (error) => {
        console.error('Error al crear empleado', error);
      }
    );
  }

  generarIdAleatoria(): string {
    return Math.floor((Math.random() * (999 - 100 + 1)) + 100).toString();
  }

  fechaNacimientoValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const fechaNacimiento = new Date(control.value);
    const edad = this.form?.get('edad')?.value;
    const fechaActual = new Date();
    const edadCalculada = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    if (edad !== edadCalculada || edad < 18) {
      return { 'fechaNacimientoInvalida': true };
    }
    return null;
  }
}