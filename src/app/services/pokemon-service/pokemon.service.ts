import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../../interfaces/IPokemon';
import { IPokemonDetails } from '../../interfaces/IPokemonDetails';
import { IPokemonResults } from '../../interfaces/IPokemonResults';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  #http = inject(HttpClient);
  #url = 'https://pokeapi.co/api/v2';

  displayPokemons(url?: string): Observable<IPokemonResults> {
    const apiUrl = url || `${this.#url}/pokemon/?limit=20&offset=20`;
    return this.#http.get<IPokemonResults>(apiUrl);
  }

  displayPokemonDetails(url: string): Observable<IPokemonDetails> {
    return this.#http.get<IPokemonDetails>(url);
  }

  displayPreviousPokemons(url: string): Observable<IPokemonResults> {
    return this.#http.get<IPokemonResults>(url);
  }

  displayNextPokemons(url: string): Observable<IPokemonResults> {
    return this.#http.get<IPokemonResults>(url);
  }

  getPokemonImageUrl(url: string): string {
    const id = url.match(/\/pokemon\/(\d+)\//)?.[1];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
