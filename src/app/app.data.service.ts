import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

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

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any>{
    return this.httpClient.get(`${baseUrl}/users`)
  }

  getPosts(userId?: number): Observable<any>{
    const params = userId ? `?userId=${userId}` : '' ;
    return this.httpClient.get(`${baseUrl}/posts${params}`)
  }
}
