import { Component, inject, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon-service/pokemon.service';
import { Pokemon } from '../../interfaces/IPokemon';
import { select, Store } from '@ngrx/store';
import { PokemonState } from '../../state/reducers';
import {
  selectAllPokemons,
  selectNextUrl,
  selectPreviousUrl,
} from '../../state/selectors';
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
  nextUrl = signal<string | null>('');
  previousUrl = signal<string | null>('');

  ngOnInit(): void {
    this.#store.dispatch(loadPokemons({}));
    this.#store.pipe(select(selectAllPokemons)).subscribe((pokemons) => {
      this.pokemons.set(pokemons);
    });
    this.#store.pipe(select(selectNextUrl)).subscribe((next) => {
      this.nextUrl.set(next);
      console.log('Next URL: ' + next);
    });
    this.#store.pipe(select(selectPreviousUrl)).subscribe((previous) => {
      this.previousUrl.set(previous);
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

  loadNext(): void {
    const nextUrlValue = this.nextUrl();
    console.log('Loading next page: ' + nextUrlValue);

    if (nextUrlValue) {
      this.#store.dispatch(loadPokemons({ url: nextUrlValue }));
    }
  }

  loadPrevious(): void {
    const previousUrlValue = this.previousUrl();

    if (previousUrlValue) {
      this.#store.dispatch(loadPokemons({ url: previousUrlValue }));
    }
  }
}
