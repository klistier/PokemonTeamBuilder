import { Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../interfaces/IPokemon';
import { select, Store } from '@ngrx/store';
import { PokemonState } from '../../state/reducers';
import { selectTeam } from '../../state/selectors';
import { addPokemonToTeam, removePokemonFromTeam } from '../../state/actions';
import { PokemonService } from '../../services/pokemon-service/pokemon.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pokemon-team',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './pokemon-team.component.html',
})
export class PokemonTeamComponent implements OnInit {
  readonly #store = inject(Store<PokemonState>);
  readonly #pokemonService = inject(PokemonService);

  team = signal<Pokemon[]>([]);

  ngOnInit(): void {
    this.#store.pipe(select(selectTeam)).subscribe((team) => {
      this.team.set(team);
    });
  }

  getPokemonImageUrl(url: string): string {
    return this.#pokemonService.getPokemonImageUrl(url);
  }

  removePokemonFromTeam(pokemon: Pokemon): void {
    this.#store.dispatch(removePokemonFromTeam({ pokemon }));
  }
}
