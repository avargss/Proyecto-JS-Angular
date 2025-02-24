import { Routes } from '@angular/router';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { HomeComponent } from './components/home/home.component';
import { EditarComponent } from './components/empleados/editar/editar.component';

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
        component: HotelesComponent,
        title: 'Crear hoteles'
    },
    {
        path: 'hoteles/editar/:?',
        component: HotelesComponent,
        title: 'Editar hoteles'
    },
    {
        path: 'empleados',
        component: EmpleadosComponent,
        title: 'Empleados'
    },
    {
        path: 'empleados/:?',
        component: EmpleadosComponent,
        title: 'Crear empleados'
    },
    {
        path: 'empleados/editar/:id',
        component: EditarComponent,
        title: 'Editar empleados'
    }
];