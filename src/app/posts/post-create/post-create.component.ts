import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "../post.model";

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
    @Output() postCreated = new EventEmitter<Post>();
    
    onAddPost(form: NgForm) {
        if(form.invalid) {
            return;
        }
        const post: Post = {
            title: form.value.myTitle,
            content: form.value.myContent
        };
        this.postCreated.emit(post);
    }
}