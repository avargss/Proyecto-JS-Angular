import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapaLeafletComponent } from './components/mapa-leaflet/mapa-leaflet.component';

import { HotelesComponent } from './components/hoteles/hoteles.component';
import { CrearHotelComponent } from './components/hoteles/crear/crear.component';
import { EditarHotelComponent } from './components/hoteles/editar/editar.component';
import { DetalleHotelComponent } from './components/hoteles/detalle/detalle.component';

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
        path: 'mapa',
        component: MapaLeafletComponent,
        title: 'Mapa'
    },
    {
        path: 'hoteles',
        component: HotelesComponent,
        title: 'Hoteles'
    },
    {
        path: 'hoteles/crear',
        component: CrearHotelComponent,
        title: 'Crear hoteles'
    },
    {
        path: 'hoteles/editar/:id',
        component: EditarHotelComponent,
        title: 'Editar hoteles'
    },
    {
        path: 'hoteles/detalle/:id',
        component: DetalleHotelComponent,
        title: 'Detalle del hotel'
    },
    {
        path: 'empleados',
        component: EmpleadosComponent,
        title: 'Empleados'
    },
    {
        path: 'empleados/crear',
        component: CrearEmpleadoComponent,
        title: 'Crear empleados'
    },
    {
        path: 'empleados/editar/:id',
        component: EditarEmpleadoComponent,
        title: 'Editar empleados'
    }
];