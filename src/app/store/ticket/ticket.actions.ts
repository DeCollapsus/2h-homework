import { createAction, props } from '@ngrx/store';
import { Ticket } from 'src/interfaces/ticket.interface';

export const TICKET_ACTIONS = {
    GET_TICKETS: 'Get all tickets',
    GET_TICKETS_SUCCESS: 'Get all tickets success',
    GET_TICKETS_FAILURE: 'Get all tickets failure',

    CREATE_TICKET: 'Create new ticket',
    CREATE_TICKET_SUCCESS: 'Create new ticket success',
    CREATE_TICKET_FAILURE: 'Create new ticket failure',

    GET_TICKET: 'Get a single ticket',
    GET_TICKET_SUCCESS: 'Get a single ticket success',
    GET_TICKET_FAILURE: 'Get a single ticket failure',

    ASSIGN_TICKET: 'Assign ticket to user',
    ASSIGN_TICKET_SUCCESS: 'Assign ticket to user success',
    ASSIGN_TICKET_FAILURE: 'Assign ticket to user failure',

    COMPLETE_TICKET: 'Complete ticket',
    COMPLETE_TICKET_SUCCESS: 'Complete ticket success',
    COMPLETE_TICKET_FAILURE: 'Complete ticket failure'
};

export const getTickets = createAction(TICKET_ACTIONS.GET_TICKETS);
export const getTicketsSuccess = createAction(TICKET_ACTIONS.GET_TICKETS_SUCCESS, props<{payload: Ticket[]}>());
export const getTicketsFailure = createAction(TICKET_ACTIONS.GET_TICKETS_FAILURE);

export const createTicket = createAction(TICKET_ACTIONS.CREATE_TICKET, props<{description: string}>());
export const createTicketSuccess = createAction(TICKET_ACTIONS.CREATE_TICKET_SUCCESS);
export const createTicketFailure = createAction(TICKET_ACTIONS.CREATE_TICKET_FAILURE);

export const getTicket = createAction(TICKET_ACTIONS.GET_TICKET, props<{ticketId: number}>());
export const getTicketSuccess = createAction(TICKET_ACTIONS.GET_TICKET_SUCCESS, props<{payload: Ticket}>());
export const getTicketFailure = createAction(TICKET_ACTIONS.GET_TICKET_FAILURE);


export const assignTicket = createAction(TICKET_ACTIONS.ASSIGN_TICKET, props<{userId: number, ticketId: number}>());
export const assignTicketSuccess = createAction(TICKET_ACTIONS.ASSIGN_TICKET_SUCCESS, props<{payload: Ticket}>());
export const assignTicketFailure = createAction(TICKET_ACTIONS.ASSIGN_TICKET_FAILURE);

export const completeTicket = createAction(TICKET_ACTIONS.COMPLETE_TICKET, props<{ticketId: number}>());
export const completeTicketSuccess = createAction(TICKET_ACTIONS.COMPLETE_TICKET_SUCCESS, props<{payload: Ticket}>());
export const completeTicketFailure = createAction(TICKET_ACTIONS.COMPLETE_TICKET_FAILURE);