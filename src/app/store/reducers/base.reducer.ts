import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { userElementsLibaryReducer, UserElementLibaryState } from 'src/app/store/reducers/user-elements-libary.reducer';
import { presentationColumnsReducer, PresentationColumnsState } from 'src/app/store/reducers/presentation-columns.reducer';

export interface AppState {
    userElementsLibary: UserElementLibaryState,
    presentationColumns: PresentationColumnsState,
}

export const baseReducers: ActionReducerMap<AppState> = {
    userElementsLibary: userElementsLibaryReducer,
    presentationColumns: presentationColumnsReducer,
};

export const metaReducers: MetaReducer<AppState>[] = environment.production ? [] : [ storeFreeze ];
