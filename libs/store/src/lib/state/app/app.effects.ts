import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AppActions from './app.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UsersService } from '@apaleo/sdk';

@Injectable()
export class AppEffects {
  actions$ = inject(Actions);
  constructor(
    private userService: UsersService
  ) { }

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AppActions.GetUsers
      ),
      mergeMap(({payload}) => this.userService.getUsers(payload.pageNumber,payload.searchText,payload.sortBy).pipe(
        map((response) => AppActions.GetUsersSuccessful({ payload: { response, pageNumber:payload.pageNumber } })),
        catchError((error) => {
          return [
            AppActions.GetUsersFailure({
              payload: error
            })
          ]
        })
      ))
    )
  );

  initApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AppActions.InitAPP
      ),
      map(() => AppActions.GetUsers({payload:{pageNumber:0}}))
    )
  );
}
