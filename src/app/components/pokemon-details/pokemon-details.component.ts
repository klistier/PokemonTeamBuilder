import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { IPokemonDetails } from '../../interfaces/IPokemonDetails';
import { ModalService } from '../../services/modal-service/modal.service';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: `./pokemon-details.component.html`,
})
export class PokemonDetailsComponent {
  pokemon: IPokemonDetails = inject(MAT_DIALOG_DATA).details;
  readonly #modalService = inject(ModalService);

  close() {
    this.#modalService.close();
  }
}
