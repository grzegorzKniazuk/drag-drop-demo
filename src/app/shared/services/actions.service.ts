import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ActionsService {
    public readonly onDropID$: Subject<{ sectionID: string, slideID: string, idInColumn: number }> = new Subject<{ sectionID: string, slideID: string, idInColumn: number }>();
}
