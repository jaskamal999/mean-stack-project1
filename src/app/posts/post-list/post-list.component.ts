import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
    // posts = [
    //     {title: "First post\'s title", content: "First post\'s content"},
    //     {title: "Second post\'s title", content: "Second post\'s content"},
    //     {title: "Third post\'s title", content: "Third post\'s content"},
    // ]
    posts: Post[] = [];
    private postsSub : Subscription;

    constructor(public postsService: PostsService) {}

    ngOnInit() {
        this.posts = this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
            this.posts = posts;
        });
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}