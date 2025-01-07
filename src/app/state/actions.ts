import { createAction, props } from '@ngrx/store';
import { Pokemon } from '../interfaces/IPokemon';

export const loadPokemons = createAction(
  '[Pokemon] Load Pokemons',
  props<{ url?: string }>()
);

export const loadPokemonsSuccess = createAction(
  '[Pokemon] Load Pokemons Success',
  props<{ pokemons: Pokemon[]; next: string; previous: string }>()
);

export const loadPokemonsFailure = createAction(
  '[Pokemon] Load Pokemons Failure',
  props<{ error: any }>()
);

export const addPokemonToTeam = createAction(
  '[Pokemon] Add Pokemon To Team',
  props<{ pokemon: Pokemon }>()
);

export const removePokemonFromTeam = createAction(
  '[Pokemon] Remove Pokemon From Team',
  props<{ pokemon: Pokemon }>()
);
