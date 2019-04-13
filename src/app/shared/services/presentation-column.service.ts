import { EventEmitter, Injectable } from '@angular/core';
import { Column } from 'src/app/shared/interfaces/column';

@Injectable({
    providedIn: 'root',
})
export class PresentationColumnService {

    public readonly onAddColumn$: EventEmitter<Column> = new EventEmitter<Column>();
    constructor() {
    }

    public addColumn(column: Column): void {
        this.onAddColumn$.emit(column);
    }
}
