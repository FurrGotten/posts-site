import {ActionCreator, AnyAction} from 'redux';

import { User, Post } from "./app.data.service";

export const FETCH_USERS_START = 'FETCH_USERS_START';
export const fetchUsersStart: ActionCreator<AnyAction> = () => ({
  type: FETCH_USERS_START,
});

export const FETCH_USERS_COMPLETE = 'FETCH_USERS_COMPLETE';
export const fetchUsersComplete: ActionCreator<AnyAction> = (payload: User[]) => ({
  type: FETCH_USERS_COMPLETE,
  payload: payload,
});

export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const fetchPostsStart: ActionCreator<AnyAction> = () => ({
  type: FETCH_POSTS_START,
});

export const FETCH_POSTS_COMPLETE = 'FETCH_POSTS_COMPLETE';
export const fetchPostsComplete: ActionCreator<AnyAction> = (payload: Post[]) => ({
  type: FETCH_POSTS_COMPLETE,
  payload: payload,
});



