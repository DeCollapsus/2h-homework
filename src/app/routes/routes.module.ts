import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TicketComponent } from './ticket/ticket.component';
import { TicketsComponent, DialogTicketError } from './tickets/tickets.component';

import { MaterialModule } from '../material.module';


@NgModule({
    declarations: [TicketComponent, TicketsComponent, DialogTicketError],
    imports: [CommonModule, RouterModule, MaterialModule, FormsModule, ReactiveFormsModule]
})
export class RoutesModule {

}