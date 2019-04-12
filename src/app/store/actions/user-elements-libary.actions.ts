import { Action } from '@ngrx/store';
import { ImageFile } from 'src/app/shared/interfaces/image-file';

export enum UserElementsLibaryActionTypes {
    AddElementToUserLibary = '[AddElementToUserLibary] Action',
    RemoveElementFromUserLibary = '[RemoveElementFromUserLibary] Action',
}

export class AddElementToUserLibary implements Action {
    public readonly type = UserElementsLibaryActionTypes.AddElementToUserLibary;

    constructor(public payload: { imageFile: ImageFile }) {}
}

export class RemoveElementFromUserLibary {
    public readonly type = UserElementsLibaryActionTypes.RemoveElementFromUserLibary;

    constructor(public payload: { id: number }) {}
}

export type UserElementsLibaryActions =  AddElementToUserLibary | RemoveElementFromUserLibary;
