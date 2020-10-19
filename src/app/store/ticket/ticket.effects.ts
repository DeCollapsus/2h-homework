import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import * as TicketActions from './ticket.actions';
import * as UserActions from '../user/user.actions';
import { BackendService } from '../../backend.service';
import { isNil } from 'ramda';

@Injectable()
export class TicketEffects {
 
  getTickets$ = createEffect(() => this.actions$.pipe(
    ofType(TicketActions.getTickets),
    mergeMap(() => this.service.tickets()
      .pipe(
        map(payload =>  TicketActions.getTicketsSuccess({ payload })),
        catchError(() => of(TicketActions.getTicketFailure()))
      ))
    )
  );

  createTicket$ = createEffect(() => this.actions$.pipe(
    ofType(TicketActions.createTicket),
    mergeMap((payload) => this.service.newTicket(payload)
      .pipe(
        switchMap(() => ([TicketActions.createTicketSuccess(), TicketActions.getTickets()])),
        catchError(() => of(TicketActions.createTicketFailure()))
      ))
    )
  );

  getTicket$ = createEffect(() => this.actions$.pipe(
    ofType(TicketActions.getTicket),
    mergeMap(({ ticketId }) => this.service.ticket(ticketId)
      .pipe(
        switchMap(payload => {
          let result = [];
          if (!isNil(payload.assigneeId)) result = [UserActions.getUser({ userId: payload.assigneeId })];
          return [TicketActions.getTicketSuccess({ payload }), ...result];
        }),
        catchError(() => of(TicketActions.getTicketFailure()))
      ))
    )
  );

  completeTicket$ = createEffect(() => this.actions$.pipe(
    ofType(TicketActions.completeTicket),
    mergeMap(({ ticketId }) => this.service.complete(ticketId)
      .pipe(
        map(payload => TicketActions.completeTicketSuccess({ payload })),
        catchError(() => of(TicketActions.completeTicketFailure()))
      ))
    )
  );

  assignTicket$ = createEffect(() => this.actions$.pipe(
    ofType(TicketActions.assignTicket),
    mergeMap(({ ticketId, userId }) => this.service.assign(ticketId, userId)
      .pipe(
        switchMap(payload => [TicketActions.assignTicketSuccess({ payload }), UserActions.getUser({ userId })]),
        catchError(() => of(TicketActions.assignTicketFailure()))
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private service: BackendService
  ) {}
}