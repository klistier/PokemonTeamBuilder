import { Pokemon } from './IPokemon';

export interface IPokemonResults {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}
