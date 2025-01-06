import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { pokemonReducer } from './state/reducers';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { PokemonEffects } from './state/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore({ pokemonReducer: pokemonReducer }),
    provideEffects([PokemonEffects]),
  ],
};
