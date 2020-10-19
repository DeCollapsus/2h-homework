import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from 'src/interfaces';
import * as UserActions from './user.actions';

interface State {
    current: User;
    list: User[];
    loading: Boolean;
    error: Boolean;
}

const initialState: State = {
    current: null,
    list: [],
    loading: false,
    error: false
};

const _userReducer = createReducer(initialState,
    on(
        UserActions.getUser,
        UserActions.getUsers, (state) => ({
            ...state,
            loading: true,
            error: false})),
    on(UserActions.getUsersSuccess, (state, { payload }) => ({...state, loading: false, list: payload})),
    on(
        UserActions.getUserSuccess, (state, {payload}) => ({ ...state, loading: false, current: payload })),
    on(
        UserActions.getUsersFailure,
        UserActions.getUserFailure, (state) => ({...state, loading: false, error: true}))
    );

export function userReducer(state, action) {
    return _userReducer(state, action);
}

export const getUserState = createFeatureSelector<State>('user');
export const selectUserList = createSelector(
    getUserState,
    (state: State) => state.list
);

export const selectUser = createSelector(
    getUserState,
    (state: State) => state.current
);

export const selectUserLoading = createSelector(
    getUserState,
    (state: State) => state.loading
);

export const selectUserError = createSelector(
    getUserState,
    (state: State) => state.error
);