import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  #dialog = inject(MatDialog);

  public open(component: any, data: any = {}) {
    const dialogRef = this.#dialog.open(component, {
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public close = () => this.#dialog.closeAll();
}
