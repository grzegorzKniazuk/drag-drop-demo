import { Column } from 'src/app/shared/interfaces/column';
import { Action } from '@ngrx/store';

export enum PresentationColumnsActionsTypes {
    AddColumn = '[AddColumn] Action',
    RemoveColumn = '[RemoveColumn] Action',
}

export class AddColumn implements Action {
    public readonly type = PresentationColumnsActionsTypes.AddColumn;

    constructor(public payload: { column: Column }) {
    }
}

export class RemoveColumn implements Action {
    public readonly type = PresentationColumnsActionsTypes.RemoveColumn;

    constructor(public payload: { id: number }) {
    }
}

export type PresentationColumnsActions = AddColumn | RemoveColumn;
