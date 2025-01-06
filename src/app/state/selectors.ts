import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from './reducers';

export const selectPokemonState =
  createFeatureSelector<PokemonState>('pokemonReducer');

export const selectAllPokemons = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.pokemons
);

export const selectTeam = createSelector(
  selectPokemonState,
  (state: PokemonState) => state.team
);

export const selectError = createSelector(
    selectPokemonState,
    (state: PokemonState) => state.error
)

