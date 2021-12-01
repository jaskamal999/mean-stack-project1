import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
    // posts = [
    //     {title: "First post\'s title", content: "First post\'s content"},
    //     {title: "Second post\'s title", content: "Second post\'s content"},
    //     {title: "Third post\'s title", content: "Third post\'s content"},
    // ]
    @Input() posts = [];
}