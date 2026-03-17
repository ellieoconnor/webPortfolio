import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { BlogPost } from '../blog-post.model';

@Component({
	selector: 'app-blog-list',
	imports: [RouterModule, MatDivider, DatePipe],
	templateUrl: './blog-list.component.html',
	styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
	posts: BlogPost[] = [];

	constructor(
		private blogService: BlogService,
		private router: Router
	) {}

	ngOnInit() {
		this.blogService.getPostsList().subscribe({
			next: (posts) => {
				this.posts = posts;
			},
			error: (error) => {
				console.error('Error fetching posts:', error);
			}
		});
	}

	getBlogPost(id: number) {
		this.router.navigate(['/blog', id]);
	}
}
