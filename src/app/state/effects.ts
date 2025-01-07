import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonService } from '../services/pokemon-service/pokemon.service';
import {
  loadPokemons,
  loadPokemonsFailure,
  loadPokemonsSuccess,
} from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PokemonEffects {
  #actions$ = inject(Actions);
  #pokemonService = inject(PokemonService);

  loadPokemons$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(loadPokemons),
      mergeMap(({ url }) =>
        this.#pokemonService.displayPokemons(url).pipe(
          map((response) =>
            loadPokemonsSuccess({
              pokemons: response.results,
              next: response.next,
              previous: response.previous,
            })
          ),
          catchError((error) => of(loadPokemonsFailure({ error })))
        )
      )
    )
  );
}
