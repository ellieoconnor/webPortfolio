import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { Router, RouterModule } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-blog-list',
	standalone: true,
	imports: [RouterModule, NgForOf, MatDivider],
	templateUrl: './blog-list.component.html',
	styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
	posts: { title: string; slug: string; date: string; summary: string }[] = [];

	constructor(
		private blogService: BlogService,
		private router: Router
	) {}

	ngOnInit() {
		this.blogService.getPostsList().subscribe(
			(posts) => {
				this.posts = posts;
			},
			(error) => {
				console.error('Error fetching posts:', error); // Log if there's an error
			}
		);
	}

	getBlogPost(slug: string) {
		this.router.navigate(['/blog', slug]);
	}
}
