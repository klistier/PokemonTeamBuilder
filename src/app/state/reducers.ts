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
  error: null;
}

export const initialState: PokemonState = {
  pokemons: [],
  team: [],
  error: null,
};

export const pokemonReducer = createReducer(
  initialState,
  on(loadPokemonsSuccess, (state, { pokemons }) => ({ ...state, pokemons })),

  on(addPokemonToTeam, (state, { pokemon }) => ({
    ...state,
    team: [...state.team, pokemon],
  })),

  on(removePokemonFromTeam, (state, { pokemon }) => ({
    ...state,
    team: state.team.filter((p) => p !== pokemon),
  }))
);
