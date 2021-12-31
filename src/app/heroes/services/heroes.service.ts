import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroe';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseURL: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getHeroes() {
    return this.http.get<Heroe[]>(`${this.baseURL}/heroes`);
  }

  getHeroePorId(id: string) {
    return this.http.get<Heroe>(`${this.baseURL}/heroes/${id}`);
  }

  getSugerencias(termino: string) {
    return this.http.get<Heroe[]>(`${this.baseURL}/heroes?q=${termino}&_limit=6`);
  }

  agregarHeroe(heroe: Heroe) {
    return this.http.post<Heroe>(`${this.baseURL}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe) {
    return this.http.put<Heroe>(`${this.baseURL}/heroes/${heroe.id}`, heroe);
  }

  borrarHeroe(id: string) {
    return this.http.delete<any>(`${this.baseURL}/heroes/${id}`);
  }
}
