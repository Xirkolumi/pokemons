import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { delay, Observable, take } from 'rxjs';
import { PokemonListItem } from '../list.model';

@Injectable({
  providedIn: 'root'
})
export class ListHttpService {

  constructor(private http: HttpClient) { }

  getPokemonPage(limit: number, offset: number): Observable<PokemonListDto> {
    return this.http.get<any>(this.createCompleteRoute(`pokemon?limit=${limit}&offset=${offset}`));
  }

  getPokemon(name: string): Observable<PokemonListItem> {
    return this.http.get<PokemonListItem>(this.createCompleteRoute(`pokemon/${name}`));
  }

  makeRequest(url: string) {
    return this.http.get<any>(url).pipe(delay(10), take(1));
  }

  private createCompleteRoute(route: string) {
    return `${environment.urlAddress}/${route}`;
  }
}

export interface PokemonListDto {
  count: number;
  results: {
    name: string;
    url: string;
  }[]
}