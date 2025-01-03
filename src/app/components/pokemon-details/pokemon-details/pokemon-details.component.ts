import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../../services/pokemon-service/pokemon.service';
import { Pokemon } from '../../../interfaces/IPokemon';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-details.component.html',
})
export class PokemonDetailsComponent implements OnInit {
  readonly #pokemonService = inject(PokemonService);
  pokemons = signal<Pokemon[]>([]);

  ngOnInit(): void {
    this.#pokemonService.displayPokemons().subscribe({
      next: (res) => {
        this.pokemons.set(res);
      },
    });
  }
}
