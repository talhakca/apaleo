import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Store } from '@ngrx/store';
import { GetUsers } from '@apaleo/store';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'apaleo';
  store = inject(Store);

  ngOnInit(): void {
      this.store.dispatch(GetUsers({payload:{pageNumber:0}}));
  }
}
