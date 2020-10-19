import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketComponent } from './routes/ticket/ticket.component';
import { TicketsComponent } from './routes/tickets/tickets.component';

const routes: Routes = [
    { path: 'tickets', component: TicketsComponent },
    { path: 'tickets/:id', component: TicketComponent },
    { path: '', redirectTo: '/tickets', pathMatch: 'full'}
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }