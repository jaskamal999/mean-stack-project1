import { Subject } from 'rxjs';
import {Post} from './post.model';


export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPosts() {
        return [...this.posts];
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(post: Post) {
        // const myPost: Post = {title: post.title, content: post.content};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    } 
}