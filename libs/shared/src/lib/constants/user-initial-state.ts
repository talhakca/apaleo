import { UserState } from "../interfaces";

export const userInitialState: UserState = {
    pageNumber:0,
    data:[],
    isLoading:false,
    total:0,
    searchText:'',
    sortBy:undefined
  };