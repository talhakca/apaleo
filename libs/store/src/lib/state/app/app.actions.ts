import { GetUsersResponse, SortBy, User } from '@apaleo/shared';
import { createAction, props } from '@ngrx/store';

/* action types */
export enum ActionTypes {
  InitAPP = '[APP] InitAPP',
  GetUsers = '[GET] Users',
  GetUsersSuccessful = '[GET] UsersSuccessful',
  GetUsersFailure = '[GET] UsersFailure'
}

/* get */
export const InitAPP = createAction(ActionTypes.InitAPP);
export const GetUsers = createAction(ActionTypes.GetUsers, props<{ payload: { pageNumber:number,searchText?:string,sortBy?:SortBy } }>());
export const GetUsersSuccessful = createAction(ActionTypes.GetUsersSuccessful, props<{ payload: { response: GetUsersResponse, pageNumber:number } }>());
export const GetUsersFailure = createAction(ActionTypes.GetUsersFailure, props<{ payload: { error: any } }>());
