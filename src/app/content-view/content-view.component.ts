import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Post } from '../post';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-content-view',
  templateUrl: './content-view.component.html',
  styleUrls: ['./content-view.component.scss']
})
export class ContentViewComponent implements OnInit {

  posts: Post[];
  postsPerPage: Post[];
  length = 100;
  pageSize = 6;
  pageSizeOptions: number[] = [6, 12, 24, 48, 100];
  pageEvent: PageEvent;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getPosts()
      .subscribe((posts) => {
        this.posts = posts;
        this.postsPerPage = this.posts.slice(0, this.pageSize);
      });
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.postsPerPage = this.posts.slice(firstCut, secondCut);
  }

}
