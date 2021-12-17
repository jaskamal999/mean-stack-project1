import { Subject } from 'rxjs';
import {Post} from './post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts() {
        // we need to listen to this get request as we do expect a response, so we use subscribe
        // we dont need to store this and unsubscribe in features built in angular like http client, it is handled automatically
        // .get method extracts and format the data to JS from json
        this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/posts')
            .subscribe((postData) => {
                this.posts = postData.posts;
                this.postsUpdated.next([...this.posts]);
            });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(post: Post) {
        // const myPost: Post = {title: post.title, content: post.content};
        // the post in second argument below is the post we want to add, not anything related to post request 
        this.http.post<{message: string}>('http://localhost:3000/posts', post)
            .subscribe((responseData) => {
                console.log(responseData.message);
                this.posts.push(post);
                this.postsUpdated.next([...this.posts]);
            });
    } 
}