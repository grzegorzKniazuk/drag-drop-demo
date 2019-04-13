import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Column } from 'src/app/shared/interfaces/column';
import { PresentationColumnsActions, PresentationColumnsActionsTypes } from 'src/app/store/actions/presentation-columns.actions';

export interface PresentationColumnsState extends EntityState<Column> {
}

export const presentationColumnsStateAdapter: EntityAdapter<Column> = createEntityAdapter<Column>();

export const initialPresentationColumnsState: PresentationColumnsState = presentationColumnsStateAdapter.getInitialState();

export function presentationColumnsReducer(state = initialPresentationColumnsState, action: PresentationColumnsActions): PresentationColumnsState {
    switch (action.type) {
        case PresentationColumnsActionsTypes.AddColumn: {
            return presentationColumnsStateAdapter.addOne(action.payload.column, state);
        }
        case PresentationColumnsActionsTypes.RemoveColumn: {
            return presentationColumnsStateAdapter.removeOne(action.payload.id, state);
        }
        default: {
            return {
                ...state,
            };
        }
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal,
} = presentationColumnsStateAdapter.getSelectors();
