import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { Ticket, User } from '../../../interfaces';
import { getTicket, completeTicket, assignTicket } from '../../store/ticket/ticket.actions'
import { selectTicket, selectTicketLoading, selectTicketError } from '../../store/ticket/ticket.reducer';

import { getUsers } from '../../store/user/user.actions';
import { selectUser, selectUserList, selectUserLoading } from '../../store/user/user.reducer';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit, OnDestroy {

  ticket$: Observable<Ticket>;
  user$: Observable<User>;
  users$: Observable<User[]>;
  loadingUser$: Observable<Boolean>;
  loadingTicket$: Observable<Boolean>;
  private destroy$ = new Subject();

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ticket$ = this.store.select(selectTicket);
    this.user$ = this.store.select(selectUser);
    this.users$ = this.store.select(selectUserList);
    this.loadingUser$ = this.store.select(selectUserLoading);
    this.loadingTicket$ = this.store.select(selectTicketLoading);

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.store.dispatch(getTicket({ ticketId: Number(params['id']) }));
    });

    this.store.select(selectTicketError)
      .pipe(takeUntil(this.destroy$)).subscribe((error) => {
        if (error) this.router.navigate(['tickets']);
      });

    this.store.dispatch(getUsers());
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  

  public completeTicket(ticket: Ticket): void {
    this.store.dispatch(completeTicket({ ticketId: ticket.id }));
  }

  public assignTicket(ticketId: number, userId: number) {
    this.store.dispatch(assignTicket({ ticketId, userId }))
  }
}
