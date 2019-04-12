import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as userElementEntitySelectors from 'src/app/store/reducers/user-elements-libary.reducer';
import { UserElementLibaryState } from 'src/app/store/reducers/user-elements-libary.reducer';

export const userElementLibaryState = createFeatureSelector<UserElementLibaryState>('userElementsLibary');

export const selectNumberOfItemsInUserLibary = createSelector(
    userElementLibaryState,
    userElementEntitySelectors.selectTotal,
);

export const selectUserElementLibary = createSelector(
    userElementLibaryState,
    userElementEntitySelectors.selectAll,
);
