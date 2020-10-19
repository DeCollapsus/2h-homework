import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { BackendService } from '../../backend.service';
 
@Injectable()
export class UserEffects {
 
  getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getUsers),
    mergeMap(() => this.service.users()
      .pipe(
        map(payload =>  UserActions.getUsersSuccess({ payload })),
        catchError(() => of(UserActions.getUsersFailure()))
      ))
    )
  );

  getUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getUser),
    mergeMap(({ userId }) => this.service.user(userId)
      .pipe(
        map(payload => UserActions.getUserSuccess({ payload })),
        catchError(() => of(UserActions.getUserFailure()))
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private service: BackendService
  ) {}
}