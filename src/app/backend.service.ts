import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { Ticket } from '../interfaces/ticket.interface';
import { User } from '../interfaces/user.interface';
import { assoc, assocPath } from 'ramda';

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */

function randomDelay() {
    return Math.random() * 4000;
}

@Injectable()
export class BackendService {
    public storedTickets: Ticket[] = [
        {
            id: 0,
            completed: false,
            assigneeId: 111,
            description: 'Install a monitor arm'
        },
        {
            id: 1,
            completed: false,
            assigneeId: 111,
            description: 'Move the desk to the new location'
        }
    ];

    public storedUsers: User[] = [{ id: 111, name: 'Victor' }, {id: 112, name: 'Alexandre'}];

    private lastId: number = 1;

    private findUserById = id => this.storedUsers.find((user: User) => user.id === +id);
    private findTicketById = id => this.storedTickets.find((ticket: Ticket) => ticket.id === +id);
    private updateTicket = id => (property, value) => {
        const index = this.storedTickets.findIndex((ticket: Ticket) => ticket.id === +id);
        this.storedTickets = assocPath([index], assoc(property, value, this.storedTickets[index]), this.storedTickets) ;
        return this.storedTickets[index];
    }

    public tickets(): Observable<Ticket[]> {
        return of(this.storedTickets).pipe(delay(randomDelay()));
    }

    public ticket(id: number): Observable<Ticket> {
        return of(this.findTicketById(id)).pipe(delay(randomDelay()));
    }

    public users(): Observable<User[]> {
        return of(this.storedUsers).pipe(delay(randomDelay()));
    }

    public user(id: number): Observable<User> {
        return of(this.findUserById(id)).pipe(delay(randomDelay()));
    }

    public newTicket(payload: { description: string }): Observable<Ticket> {
        const newTicket: Ticket = {
            id: ++this.lastId,
            completed: false,
            assigneeId: null,
            description: payload.description
        };

        this.storedTickets = [...this.storedTickets, newTicket];

        return of(newTicket).pipe(
            delay(randomDelay())
        );
    }

    public assign(ticketId: number, userId: number): Observable<Ticket> {
        const user = this.findUserById(+userId);
        const foundTicket = this.findTicketById(+ticketId);

        if (foundTicket && user) {
            return of(this.updateTicket(+ticketId)('assigneeId', +userId)).pipe(
                delay(randomDelay())
            );
        }

        return throwError(new Error('ticket or user not found'));
    }

    public complete(ticketId: number): Observable<Ticket> {
        const foundTicket = this.findTicketById(+ticketId);
        if (foundTicket) {
            return of(this.updateTicket(+ticketId)('completed', true)).pipe(
                delay(randomDelay())
            );
        }

        return throwError(new Error('ticket not found'));
    }
}
