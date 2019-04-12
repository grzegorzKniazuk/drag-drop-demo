import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
    AddElementToUserLibary,
    RemoveElementFromUserLibary,
    UserElementsLibaryActionTypes,
} from 'src/app/store/actions/user-elements-libary.actions';
import { map } from 'rxjs/operators';
import { UserElementsLibaryService } from 'src/app/shared/services/user-elements-libary.service';

@Injectable()
export class UserElementsLibaryEffects {

    @Effect({ dispatch: false })
    public addElementToUserLibary$ = this.actions$.pipe(
        ofType<AddElementToUserLibary>(UserElementsLibaryActionTypes.AddElementToUserLibary),
        map((action: AddElementToUserLibary) => {
            this.userElementsLibaryService.buildThumbnail(action.payload.imageFile);
        }),
    );

    @Effect({ dispatch: false })
    public removeElementFromUserLibary$ = this.actions$.pipe(
        ofType<RemoveElementFromUserLibary>(UserElementsLibaryActionTypes.RemoveElementFromUserLibary),
        map((action: RemoveElementFromUserLibary) => {
            this.userElementsLibaryService.removeThumbnail(action.payload.id);
        })
    );

    constructor(
        private userElementsLibaryService: UserElementsLibaryService,
        private actions$: Actions
    ) {
    }
}
