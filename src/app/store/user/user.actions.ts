import { createAction, props } from '@ngrx/store';
import { User } from 'src/interfaces/user.interface';

export const USER_ACTIONS = {
    GET_USERS: 'Get all Users',
    GET_USERS_SUCCESS: 'Get all users success',
    GET_USERS_FAILURE: 'Get all users failure',

    GET_USER: 'Get single user',
    GET_USER_SUCCESS: 'Get single user success',
    GET_USER_FALURE: 'Get single user failure'
};

export const getUsers = createAction(USER_ACTIONS.GET_USERS);
export const getUsersSuccess = createAction(USER_ACTIONS.GET_USERS_SUCCESS, props<{payload: User[]}>());
export const getUsersFailure = createAction(USER_ACTIONS.GET_USERS_FAILURE);

export const getUser = createAction(USER_ACTIONS.GET_USER, props<{userId: number}>());
export const getUserSuccess = createAction(USER_ACTIONS.GET_USER_SUCCESS, props<{payload: User}>());
export const getUserFailure = createAction(USER_ACTIONS.GET_USER_FALURE);