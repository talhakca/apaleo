import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { GetUsers, UserState } from '@apaleo/store';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { User, UserAddress } from '@apaleo/shared';
import { FormsModule } from '@angular/forms';
import {SortBy} from '@apaleo/shared';
import { debounceTime, distinct, distinctUntilChanged, Subject } from 'rxjs';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
@Component({
  selector: 'lib-users-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule,MatPaginatorModule, MatProgressSpinnerModule,MatInputModule,FormsModule,MatSortModule,MatIconModule],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.scss',
})
export class UsersDashboardComponent implements OnInit{
  private store = inject(Store<{users:UserState}>);
  users = this.store.selectSignal(state => state.users?.data);
  pageNumber = this.store.selectSignal(state => state.users?.pageNumber);
  total  = this.store.selectSignal(state => state.users?.total);
  displayedColumns = ['firstName','lastName','age','address'];
  dataSource = new MatTableDataSource<User>(this.users());
  isLoading = this.store.selectSignal(state => state.users?.isLoading);
  searchText = '';
  searchSubject= new Subject<string>();
  lastSort?:SortBy;

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(searchText => {
      console.log(searchText)
      if (searchText) {
        this.store.dispatch(GetUsers({ payload: { searchText: searchText, pageNumber: 0,sortBy:this.lastSort } }));
      } else {
        this.store.dispatch(GetUsers({ payload: { pageNumber: 0,sortBy:this.lastSort } }));
      }
    });
  }

  getAddress(address: UserAddress){
    const {coordinates, ...addressInformation} = address;
    return Object.values(addressInformation).join(', ')
  }
  handlePageEvent(e: PageEvent){
    this.store.dispatch(GetUsers({payload:{pageNumber:e.pageIndex,searchText:this.searchText}}));
  }

  applyFilter(){
    this.searchSubject.next(this.searchText);
  }

  onSortChange(sortState: Sort){
    if(sortState.direction){
      this.lastSort = {fieldName:sortState.active, direction:sortState.direction};
      this.store.dispatch(GetUsers({payload:{pageNumber:0,searchText:this.searchText,sortBy:this.lastSort}}));
    } else {
      this.lastSort = undefined;
      this.store.dispatch(GetUsers({payload:{pageNumber:0,searchText:this.searchText}}));
    }
  }
}
