import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ImageFile } from 'src/app/shared/interfaces/image-file';
import { UserElementsLibaryActions, UserElementsLibaryActionTypes } from 'src/app/store/actions/user-elements-libary.actions';

export interface UserElementLibaryState extends EntityState<ImageFile> {
}

export const userElementLibaryStateAdapter: EntityAdapter<ImageFile> = createEntityAdapter<ImageFile>();

export const initialUserElementLibaryState: UserElementLibaryState = userElementLibaryStateAdapter.getInitialState();

export function userElementsLibaryReducer(state = initialUserElementLibaryState, action: UserElementsLibaryActions): UserElementLibaryState {
    switch (action.type) {
        case UserElementsLibaryActionTypes.AddElementToUserLibary: {
            return userElementLibaryStateAdapter.addOne(action.payload.imageFile, state);
        }
        case UserElementsLibaryActionTypes.RemoveElementFromUserLibary: {
            return userElementLibaryStateAdapter.removeOne(action.payload.id, state);
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
} = userElementLibaryStateAdapter.getSelectors();
