import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {Store} from 'redux';

import {DataService, User, UserAddress} from "../app.data.service";
import {AppState, AppStore} from '../app.store';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  private storeUnsubscribe: () => void;
  private users: User[];
  private isLoading: boolean;

  constructor(private dataService: DataService, @Inject(AppStore) private store: Store<AppState>) {
  }

  ngOnInit() {
    this.storeUnsubscribe = this.store.subscribe(() => this.readState());
    this.readState();
    this.dataService.getUsers()
  }

  ngOnDestroy() {
    this.storeUnsubscribe();
  }

  readState() {
    const state: AppState = this.store.getState() as AppState;
    this.users = state.users.data;
    this.isLoading = state.users.isLoading;
  }

  getAddress(address: UserAddress): string {
    return address.city + ', ' + address.street + ', ' + address.suite + ', ' + address.zipcode
  }
}
