import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy{

  private postId: string;
  private routerParamsSub: any;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.routerParamsSub = this.route.params.subscribe(
      params => {
        this.postId = params['id']
        console.log('params', params)
      }
    )
  }

  ngOnDestroy() {
    this.routerParamsSub.unsubscribe();
  }
}
