import { createAction, createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { User } from '@apaleo/shared';


/* state key */
export const featureKey = 'users';

/* state interface */
export interface UserState {
  total:number;
  pageNumber:number;
  data:User[];
  isLoading:boolean;
}

export const initialState: UserState = {
  pageNumber:0,
  data:[],
  isLoading:false,
  total:0
};


export const appReducer = createReducer(
  initialState,
  on(AppActions.GetUsersSuccessful, (state, action) => ({
    ...state,
    data: action.payload.response.users,
    total: action.payload.response.total,
    pageNumber: action.payload.pageNumber,
    isLoading:false
  })
),
on(AppActions.GetUsers, (state) => ({
  ...state,
  isLoading:true
})));
