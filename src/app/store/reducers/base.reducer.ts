import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { userElementsLibaryReducer, UserElementLibaryState } from 'src/app/store/reducers/user-elements-libary.reducer';

export interface AppState {
    userElementsLibary: UserElementLibaryState,
}

export const baseReducers: ActionReducerMap<AppState> = {
    userElementsLibary: userElementsLibaryReducer,
};

export const metaReducers: MetaReducer<AppState>[] = environment.production ? [] : [ storeFreeze ];
