import { SortBy } from "./sort.interface";
import { User } from "./user.interface";

export interface UserState {
    total:number;
    pageNumber:number;
    data:User[];
    isLoading:boolean;
    searchText?:string;
    sortBy?: SortBy;
  }