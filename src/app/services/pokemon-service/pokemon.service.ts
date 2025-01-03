import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../../interfaces/IPokemon';
import { IPokemonDetails } from '../../interfaces/IPokemonDetails';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  #http = inject(HttpClient);
  #url = 'https://pokeapi.co/api/v2';

  displayPokemons(): Observable<Pokemon[]> {
    return this.#http.get<Pokemon[]>(`${this.#url}/pokemon/?limit=20&offset=20`);
  }

  displayPokemonDetails(id: number): Observable<IPokemonDetails>{
    return this.#http.get<IPokemonDetails>(`${this.#url}/id`)
  }
}
