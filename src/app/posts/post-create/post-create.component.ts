import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    enteredTitle = '';
    enteredContent = '';
    titleErrorMsg = "Please enter a post title";
    contentErrorMsg = "Please enter a post content";

    constructor(public postsService: PostsService) {}
    
    onAddPost(form: NgForm) {
        if(form.invalid) {
            return;
        }
        const post: Post = {
            title: form.value.myTitle,
            content: form.value.myContent
        };
        this.postsService.addPost(post);
    }
}