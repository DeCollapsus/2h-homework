import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { RouterTestingModule } from "@angular/router/testing";
import { FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TicketsComponent } from './tickets.component';

import { selectTicketList, State } from '../../store/ticket/ticket.reducer';
import { Ticket } from 'src/interfaces/ticket.interface';

describe('TicketsComponent', () => {
  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;
  let mockStore: MockStore;
  let mockTicketsSelector: MemoizedSelector<State, Ticket[]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{path: 'tickets', component: TicketsComponent}]),
        MatDialogModule,
        MatTableModule
      ],
      providers: [provideMockStore(), FormBuilder],
      declarations: [ TicketsComponent ]
    })
    .compileComponents();
    mockStore = TestBed.inject(MockStore);
    mockTicketsSelector = mockStore.overrideSelector(
      selectTicketList,
      [
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
    ]
    );
    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create 2 table rows', () => {
    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(3);

    let headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML).toBe(' Id ');

    let row1 = tableRows[1];
    expect(row1.cells[1].innerHTML).toBe('Install a monitor arm');
   });
});
