import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { RouterModule } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
	selector: 'app-blog-list',
	standalone: true,
	imports: [RouterModule, NgForOf],
	templateUrl: './blog-list.component.html',
	styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
	posts: string[] = [];

	constructor(private blogService: BlogService) {}

	ngOnInit() {
		this.blogService.getPosts().subscribe((posts) => {
			this.posts = posts;
		});
	}
}
