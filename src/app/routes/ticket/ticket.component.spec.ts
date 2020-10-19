import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { TicketComponent } from './ticket.component';
import { MemoizedSelector } from '@ngrx/store';

import { selectTicket, State } from '../../store/ticket/ticket.reducer';
import { Ticket } from 'src/interfaces';

describe('TicketComponent', () => {
  let component: TicketComponent;
  let fixture: ComponentFixture<TicketComponent>;
  let mockStore: MockStore;
  let mockTicketsSelector: MemoizedSelector<State, Ticket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{path: 'tickets/:id', component: TicketComponent}])],
      providers: [provideMockStore()],
      declarations: [ TicketComponent ]
    })
    .compileComponents();
    mockStore = TestBed.inject(MockStore);
    mockTicketsSelector = mockStore.overrideSelector(
      selectTicket,
      {
        id: 0,
        completed: false,
        assigneeId: 111,
        description: 'Install a monitor arm'
      }
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill card with data', () => {
    const description = fixture.nativeElement.querySelectorAll('#description');
    expect(description.length).toBe(1);

    expect(description[0].innerHTML).toBe('Install a monitor arm');
   });
});
