import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleados } from '../model/empleados';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class EmpleadosService {
    private empleados: Empleados[] = [];

    empleadosUrl = 'http://localhost:3001/empleados';

    private empleadosSubject = new BehaviorSubject<Empleados[]>([]);
    empleados$: Observable<Empleados[]> = this.empleadosSubject.asObservable();

    http = inject(HttpClient);
    constructor() {}

    getAllEmpleados() {
        return this.http.get<Empleados[]>(this.empleadosUrl);
    }

    getEmpleadoById(id: string) {
        return this.http.get<Empleados>(`${this.empleadosUrl}/${id}`);
    }

    // Esto es para la relación entre hotel - empleado
    getEmpleadoByHotelId(id_hotel: string) {
        return this.http.get<Empleados[]>(`${this.empleadosUrl}?id_hotel=${id_hotel}`);
    }

    addEmpleado(empleado: Empleados) {
        return this.http.post<Empleados>(this.empleadosUrl, empleado);
    }

    updateEmpleado(empleado: Empleados) {
        return this.http.put<Empleados>(`${this.empleadosUrl}/${empleado.id}`, empleado);
    }

    deleteEmpleado(id: string) {
        return this.http.delete<Empleados>(`${this.empleadosUrl}/${id}`);
    }
}