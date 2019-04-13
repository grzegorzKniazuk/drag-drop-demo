import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PresentationColumnService } from 'src/app/shared/services/presentation-column.service';
import { AddColumn, PresentationColumnsActionsTypes } from 'src/app/store/actions/presentation-columns.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class PresentationColumnsEffects {

    @Effect({ dispatch: false })
    public addColumn$ = this.actions$.pipe(
        ofType<AddColumn>(PresentationColumnsActionsTypes.AddColumn),
        map((action: AddColumn) => {
            this.presentationColumnService.addColumn(action.payload.column);
        }),
    );

    constructor(
        private presentationColumnService: PresentationColumnService,
        private actions$: Actions,
    ) {
    }
}
