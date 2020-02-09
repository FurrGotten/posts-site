import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Store} from 'redux';
import {ActivatedRoute} from "@angular/router";
import {DataService, Post} from "../app.data.service";
import {AppState, AppStore} from '../app.store';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  private storeUnsubscribe: () => void;
  private userId: number;
  private routerParamsSub: any;
  private posts: Post[];
  private isLoading: boolean;

  constructor(private route: ActivatedRoute, private dataService: DataService, @Inject(AppStore) private store: Store<AppState>) {
  }

  ngOnInit() {
    this.storeUnsubscribe = this.store.subscribe(() => this.readState());
    this.readState();
    this.routerParamsSub = this.route.params.subscribe(
      params => {
        this.userId = Number(params['id']);
        this.dataService.getPosts(this.userId);
      }
    );
  }

  ngOnDestroy() {
    this.routerParamsSub.unsubscribe();
    this.storeUnsubscribe();
  }

  readState() {
    const state: AppState = this.store.getState() as AppState;
    this.posts = state.posts.data;
    this.isLoading = state.posts.isLoading;
  }
}
