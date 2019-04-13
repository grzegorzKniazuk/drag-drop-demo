import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as presentationEntitySelectors from '../reducers/presentation-columns.reducer';

export const presentationColumnsState = createFeatureSelector('presentationColumns');

export const selectNumberOfpresentationColumns = createSelector(
    presentationColumnsState,
    presentationEntitySelectors.selectTotal,
);
