import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetUsersResponse, SortBy } from '@apaleo/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private rootUrl = 'https://dummyjson.com';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers(pageNumber:number,searchText?:string, sortBy?:SortBy){
    const controllerPath = 'users';
    let url =`${this.rootUrl}/${controllerPath}`;
    if(searchText){
      url += `/search?q=${searchText.toLowerCase()}&limit=10&skip=${pageNumber * 10}&select=firstName,lastName,address,age`;
    } else {
      url += `?limit=10&skip=${pageNumber * 10}&select=firstName,lastName,address,age`
    }
    if(sortBy){
      url += `&sortBy=${sortBy.fieldName}&order=${sortBy.direction}`
    }
    return this.httpClient.get(url) as Observable<GetUsersResponse>;
  }

}
