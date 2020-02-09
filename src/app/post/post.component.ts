import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService, Post} from "../app.data.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  private userId: number;
  private routerParamsSub: any;

  private posts: Post[];

  constructor(private route: ActivatedRoute, private dataService: DataService) {

  }

  ngOnInit() {
    this.routerParamsSub = this.route.params.subscribe(
      params => {
        this.userId = Number(params['id']);
        this.dataService.getPosts(this.userId).subscribe(
          posts => {
            this.posts = posts;
          }
        )
      }
    );
  }

  ngOnDestroy() {
    this.routerParamsSub.unsubscribe();
  }
}
