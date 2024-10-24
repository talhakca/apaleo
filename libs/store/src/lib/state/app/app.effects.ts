import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AppActions from './app.actions';
import { catchError, debounceTime, distinctUntilChanged, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { UsersService } from '@apaleo/sdk';
import { Store } from '@ngrx/store'
import { UserState } from '@apaleo/shared';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<{users:UserState}>);

  constructor(
    private userService: UsersService
  ) { }

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AppActions.GetUsers
      ),
      withLatestFrom(this.store.select(state => ({
        searchText: state.users.searchText,
        sortBy: state.users.sortBy,
      }))),
      mergeMap(([{payload},stateFields]) => this.userService.getUsers(payload.pageNumber,stateFields.searchText,stateFields.sortBy).pipe(
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

  searchTextChange$ = createEffect(() =>
  this.actions$.pipe(
    ofType(
      AppActions.SearchTextChange
    ),
    debounceTime(500),
    distinctUntilChanged(),
    map(() =>  AppActions.GetUsers({ payload: {  pageNumber: 0 } }))
  ));

  sortChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AppActions.SortChange
      ),
      withLatestFrom(this.store.select(state => state.users.pageNumber)),
      map(([action,pageNumber]) =>  AppActions.GetUsers({ payload: {  pageNumber } }))
  ))
}
