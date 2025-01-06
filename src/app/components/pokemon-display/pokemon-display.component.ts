import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon-service/pokemon.service';
import { Pokemon } from '../../interfaces/IPokemon';
import { select, Store } from '@ngrx/store';
import { PokemonState } from '../../state/reducers';
import { selectAllPokemons } from '../../state/selectors';
import { addPokemonToTeam, loadPokemons } from '../../state/actions';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalService } from '../../services/modal-service/modal.service';
import { PokemonDetailsComponent } from '../pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokemon-display',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './pokemon-display.component.html',
})
export class PokemonDisplayComponent implements OnInit {
  readonly #store = inject(Store<PokemonState>);
  readonly #pokemonService = inject(PokemonService);
  readonly #modalService = inject(ModalService);

  pokemons = signal<Pokemon[]>([]);

  ngOnInit(): void {
    this.#store.dispatch(loadPokemons());
    this.#store.pipe(select(selectAllPokemons)).subscribe((pokemons) => {
      this.pokemons.set(pokemons);
    });
  }

  getPokemonImageUrl(url: string): string {
    return this.#pokemonService.getPokemonImageUrl(url);
  }

  addToTeam(pokemon: Pokemon): void {
    this.#store.dispatch(addPokemonToTeam({ pokemon }));
  }

  openInfo(pokemon: Pokemon): void {
    this.#pokemonService
      .displayPokemonDetails(pokemon.url)
      .subscribe((details) => {
        this.#modalService.open(PokemonDetailsComponent, { details });
        console.log(JSON.stringify(details) + ' was clicked!');
      });
  }
}
