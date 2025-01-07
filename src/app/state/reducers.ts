import { createReducer, on } from '@ngrx/store';
import { Pokemon } from '../interfaces/IPokemon';
import {
  addPokemonToTeam,
  loadPokemonsFailure,
  loadPokemonsSuccess,
  removePokemonFromTeam,
} from './actions';

export interface PokemonState {
  pokemons: Pokemon[];
  team: Pokemon[];
  previous: string | null;
  next: string | null;
  error: null;
}

export const initialState: PokemonState = {
  pokemons: [],
  team: [],
  previous: null,
  next: null,
  error: null,
};

export const pokemonReducer = createReducer(
  initialState,
  on(loadPokemonsSuccess, (state, { pokemons, next, previous }) => ({ ...state, pokemons, next, previous })),

  on(addPokemonToTeam, (state, { pokemon }) => ({
    ...state,
    team: [...state.team, pokemon],
  })),

  on(removePokemonFromTeam, (state, { pokemon }) => ({
    ...state,
    team: state.team.filter((p) => p !== pokemon),
  }))
);
