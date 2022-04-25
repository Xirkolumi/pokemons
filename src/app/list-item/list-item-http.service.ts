import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PokemonListItem } from '../list/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListItemHttpService {

  constructor(private http: HttpClient) { }

  getPokemon(id: number): Observable<PokemonListItem> {
    return this.http.get<PokemonListItem>(this.createCompleteRoute(`pokemon/${id}`));
  }

  private createCompleteRoute(route: string) {
    return `${environment.urlAddress}/${route}`;
  }
}
