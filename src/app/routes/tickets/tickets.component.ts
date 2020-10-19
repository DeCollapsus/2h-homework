import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { Store } from '@ngrx/store';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Ticket } from 'src/interfaces/ticket.interface';
import { getTickets, createTicket } from '../../store/ticket/ticket.actions'
import { selectTicketError, selectTicketList } from '../../store/ticket/ticket.reducer';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, OnDestroy {

  tickets: MatTableDataSource<Ticket>;
  displayedColumns: string[] = ['id', 'description', 'completed', 'goToTicket'];
  ticketForm;
  @ViewChild(MatSort) sort: MatSort;
  private destroy$ = new Subject();

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
      this.ticketForm = this.formBuilder.group({
        description: ''
      });
    }

  ngOnInit(): void {
    this.store.select(selectTicketList)
    .pipe(takeUntil(this.destroy$))
    .subscribe((tickets: Ticket[]) => {
      if (tickets) {
        this.tickets = new MatTableDataSource(tickets);
        this.tickets.sort = this.sort;
      }
     });
    this.store.dispatch(getTickets());
    this.store.select(selectTicketError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        if (error) this.dialog.open(DialogTicketError);
      })
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tickets.filter = filterValue.trim().toLowerCase();
  }

  public goToTicket(ticket: Ticket): void {
    this.router.navigate([ticket.id], {relativeTo: this.route});
  }

  public createTicket(ticket: Ticket): void {
    this.store.dispatch(createTicket(ticket));
    this.ticketForm.reset();
  }

}

@Component({
  selector: 'dialog-ticket-error',
  templateUrl: 'tickets-error.html',
})
export class DialogTicketError {
  constructor(
    private store: Store) { }
  public retry(): void {
    this.store.dispatch(getTickets());
  }
}