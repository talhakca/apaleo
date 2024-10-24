import { createAction, createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { userInitialState, UserState } from '@apaleo/shared';


/* state key */
export const featureKey = 'users';

/* state interface */




export const appReducer = createReducer(
  userInitialState,
  on(AppActions.GetUsersSuccessful, (state, action) => ({
    ...state,
    data: action.payload.response.users,
    total: action.payload.response.total,
    pageNumber: action.payload.pageNumber,
    isLoading:false
  })),
  on(AppActions.SearchTextChange, (state, action) => ({
    ...state,
    searchText:action.payload.searchText
  })),
  on(AppActions.SortChange, (state, action) => ({
    ...state,
    sortBy:action.payload.sortBy?.direction ? action.payload.sortBy : undefined
  })),
  on(AppActions.GetUsers, (state) => ({
    ...state,
    isLoading:true
  })));
