import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ActionsService {
    public readonly onDropID$: Subject<{ sectionID: string, slideID: string, idInColumn: number }> = new Subject<{ sectionID: string, slideID: string, idInColumn: number }>();
    public readonly onDragStart$: BehaviorSubject<{ slideID: string, idInColumn: number }> = new BehaviorSubject<{ slideID: string, idInColumn: number }>(null);
    public readonly onDragEnter$: BehaviorSubject<{ slideID: string, idInColumn: number }> = new BehaviorSubject<{ slideID: string, idInColumn: number }>(null);
    public readonly onRemoveSlide$: BehaviorSubject<{ slideID: string, idInColumn: number }> = new BehaviorSubject<{ slideID: string, idInColumn: number }>(null);
    public readonly onEditSlide$: BehaviorSubject<{ slideID: string, buffer: string | ArrayBuffer }> = new BehaviorSubject<{ slideID: string, buffer: string | ArrayBuffer }>(null);
    public readonly onRealculateSlidesIDs$: BehaviorSubject<{ slideID: string, idInColumn: number }> = new BehaviorSubject<{ slideID: string, idInColumn: number }>(null);
    public readonly onAddSection$: BehaviorSubject<{ columnID: number, onRemove: boolean }> = new BehaviorSubject<{ columnID: number, onRemove: boolean }>({ columnID: 0, onRemove: false });
}
