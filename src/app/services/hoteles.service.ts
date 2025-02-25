import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hoteles } from '../model/hoteles';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HotelesService {
    private hoteles: Hoteles[] = [];

    hotelesUrl = 'http://localhost:3000/hoteles';

    private hotelesSubject = new BehaviorSubject<Hoteles[]>([]);
    hoteles$: Observable<Hoteles[]> = this.hotelesSubject.asObservable();

    http = inject(HttpClient);
    constructor() {}

    getAllHoteles() {
        return this.http.get<Hoteles[]>(this.hotelesUrl);
    }

    getHotelById(id: string) {
        return this.http.get<Hoteles>(`${this.hotelesUrl}/${id}`);
    }

    addHotel(hotel: Hoteles) {
        return this.http.post<Hoteles>(this.hotelesUrl, hotel);
    }

    updateHotel(hotel: Hoteles) {
        return this.http.put<Hoteles>(`${this.hotelesUrl}/${hotel.id}`, hotel);
    }

    deleteHotel(id: string) {
        return this.http.delete<Hoteles>(`${this.hotelesUrl}/${id}`);
    }
}