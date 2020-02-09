import {InjectionToken} from '@angular/core'
import {User, Post} from "./app.data.service";

import {AnyAction, Reducer, Store, StoreEnhancer, compose, createStore} from 'redux';
import * as reduxActions from './app.redux-actions';

export interface AppState {
  users: {data: User[], isLoading: boolean};
  posts: {data: Post[], isLoading: boolean};
}

const initialState: AppState = {
  users: { data: [], isLoading: false },
  posts: { data: [], isLoading: false },
};

const counterReducer: Reducer<AppState> =
  (state: AppState = initialState, action: AnyAction): AppState => {
    switch (action.type) {
      case reduxActions.FETCH_USERS_START:
        return {
          ...state,
          users: {data: [], isLoading: true},
        };

      case reduxActions.FETCH_USERS_COMPLETE:
        return {
          ...state,
          users: {data: action.payload, isLoading: false},
        };

      case reduxActions.FETCH_POSTS_START:
        return  {
          ...state,
          posts: {data: [], isLoading: true},
        };

      case reduxActions.FETCH_POSTS_COMPLETE:
        return {
          ...state,
          posts: {data: action.payload, isLoading: false},
        };

      default:
        return state;
    }
  };


const devtools: StoreEnhancer<AppState> = window['__REDUX_DEVTOOLS_EXTENSION__'] ? window['__REDUX_DEVTOOLS_EXTENSION__']() : f => f;

function createAppStore(): Store<AppState> {
  return createStore<AppState, AnyAction, Store, Reducer>(
    counterReducer,
    compose(devtools)
  );
}

export const AppStore = new InjectionToken('App.store');

export const appStoreProviders = [
  { provide: AppStore, useFactory: createAppStore }
];
