import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { Ticket } from 'src/interfaces';
import * as TicketActions from './ticket.actions';

export interface State {
    current: Ticket;
    list: Ticket[];
    loading: Boolean;
    error: Boolean;
}

const initialState: State = {
    current: null,
    list: [],
    loading: false,
    error: false
};

const _ticketReducer = createReducer(initialState,
    on(
        TicketActions.getTicket,
        TicketActions.getTickets,
        TicketActions.completeTicket,
        TicketActions.assignTicket, (state) => ({
            ...state,
            loading: true,
            error: false})),
    on(TicketActions.getTicketsSuccess, (state, { payload }) => ({...state, loading: false, list: payload})),
    on(
        TicketActions.getTicketSuccess,
        TicketActions.assignTicketSuccess,
        TicketActions.completeTicketSuccess, (state, {payload}) => ({ ...state, loading: false, current: payload })),
    on(
        TicketActions.getTicketFailure,
        TicketActions.getTicketsFailure,
        TicketActions.completeTicketFailure,
        TicketActions.assignTicketFailure, (state) => ({...state, loading: false, error: true}))
    );

export function ticketReducer(state, action) {
    return _ticketReducer(state, action);
}

export const getTicketState = createFeatureSelector<State>('ticket');
export const selectTicketList = createSelector(
    getTicketState,
    (state: State) => state.list
);

export const selectTicket = createSelector(
    getTicketState,
    (state: State) => state.current
);

export const selectTicketLoading = createSelector(
    getTicketState,
    (state: State) => state.loading
);

export const selectTicketError = createSelector(
    getTicketState,
    (state: State) => state.error
);


