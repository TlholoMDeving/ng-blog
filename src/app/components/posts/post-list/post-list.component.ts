import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/_Interfaces/post';
import { AuthService } from 'src/app/_Services/auth.service';
import { PostService } from 'src/app/_Services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  posts!: Observable<IPost[]>;
  constructor(private postService: PostService, public auth: AuthService) {}

  ngOnInit() {
    this.posts = this.postService.getPostsList();
  }

  delete(id: string) {
    this.postService.deletePost(id);
  }
}
