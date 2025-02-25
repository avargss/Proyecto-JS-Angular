import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { HotelesComponent } from './components/hoteles/hoteles.component';
import { CrearHotelComponent } from './components/hoteles/crear/crear.component';
import { EditarHotelComponent } from './components/hoteles/editar/editar.component';

import { EmpleadosComponent } from './components/empleados/empleados.component';
import { EditarEmpleadoComponent } from './components/empleados/editar/editar.component';
import { CrearEmpleadoComponent } from './components/empleados/crear/crear.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'hoteles',
        component: HotelesComponent,
        title: 'Hoteles'
    },
    {
        path: 'hoteles/:?',
        component: CrearHotelComponent,
        title: 'Crear hoteles'
    },
    {
        path: 'hoteles/editar/:?',
        component: EditarHotelComponent,
        title: 'Editar hoteles'
    },
    {
        path: 'empleados',
        component: EmpleadosComponent,
        title: 'Empleados'
    },
    {
        path: 'empleados/:?',
        component: CrearEmpleadoComponent,
        title: 'Crear empleados'
    },
    {
        path: 'empleados/editar/:id',
        component: EditarEmpleadoComponent,
        title: 'Editar empleados'
    }
];