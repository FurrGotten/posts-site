import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Store} from "redux";
import {Observable} from "rxjs";
import {AppState, AppStore} from "./app.store";
import {fetchPostsComplete, fetchUsersStart, fetchPostsStart, fetchUsersComplete} from "./app.redux-actions";

export interface UserAddress {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: string,
    lng: string,
  },
}

export interface UserCompany {
  name: string,
  catchPhrase: string,
  bs: string,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: UserAddress,
  phone: string,
  website: string,
  company: UserCompany,
}

export interface Post {
  userId: number,
  id: number,
  title: string,
  body: string,
}

const baseUrl = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient, @Inject(AppStore) private store: Store<AppState>) { }

  getUsers() {
    this.store.dispatch(fetchUsersStart());
    this.httpClient.get(`${baseUrl}/users`).subscribe(
      users => {
        this.store.dispatch(fetchUsersComplete(users));
      }
    )
  }

  getPosts(userId?: number) {
    this.store.dispatch(fetchPostsStart());
    const params = userId ? `?userId=${userId}` : '' ;
    this.httpClient.get(`${baseUrl}/posts${params}`).subscribe(
      posts => {
        this.store.dispatch(fetchPostsComplete(posts));
      }
    )
  }
}
