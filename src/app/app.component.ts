import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonDisplayComponent } from './components/pokemon-display/pokemon-display.component';
import { provideHttpClient } from '@angular/common/http';
import { PokemonTeamComponent } from './components/pokemon-team/pokemon-team.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PokemonTeamComponent,
    PokemonDisplayComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PokemonTeamBuilder';
}
